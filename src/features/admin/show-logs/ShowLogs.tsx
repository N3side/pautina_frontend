"use client"

import {useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import usePaginate from "@/shared/lib/hooks/usePaginate"
import Pagination from "@/features/pagination/ui/Pagination";
import UseFilters from "@/shared/lib/hooks/useFilters";
import FilterLogs from "@/features/admin/log-filters/LogFilters"
import LogCard from "../../../entities/admin/log-card/LogCard";

export default function ShowUsers() {

    const [logs, setLogs] = useState<Record<string, any> | null>(null)
    const {page, setPage, lastPage, setLastPage} = usePaginate()

    const {filters, handleChange, handleReset, isReset} = UseFilters({params: {
        level: "",
        user: "",
        entity: "",
        entity_id: "",
        method: "",
        device: "",
        ip: "",
        created_at_start: "",
        created_at_end: "",
    }})

    async function getLogs() {
        const params = new URLSearchParams(filters).toString()
        const response = await $fetch(`admin/logs?page=${page}&${params}`)

        const logs_ = response?.json?.logs
        const last_page = response?.json?.last_page
        const page_ = response?.json?.current_page
        if (logs_) {
            setLogs(logs_)
        }
        setLastPage(last_page)
        setPage(page_)
    }

    useEffect(() => {
        getLogs()
    }, [isReset, page])


    return (
        <div className="flex flex-col gap-4 w-full">

            <FilterLogs
                getLogs={getLogs}
                filters={filters}
                handleChange={handleChange}
                handleReset={handleReset}
            />

            {logs?.map((log, key) =>
                <LogCard key={key} log={log} />
            )}
            <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
        </div>
    )
}