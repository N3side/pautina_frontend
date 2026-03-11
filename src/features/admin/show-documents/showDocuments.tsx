"use client"

import {useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import usePaginate from "@/shared/lib/hooks/usePaginate"
import Pagination from "@/features/pagination/ui/Pagination";
import UseFilters from "@/shared/lib/hooks/useFilters";
import DocumentCard from "@/entities/document-card/DocumentCard";
import FilterDocuments from "@/features/admin/filter-documents/FilterDocuments";

export default function ShowUsers() {

    const [documents, setDocuments] = useState<Record<string, any> | null>(null)
    const {page, setPage, lastPage, setLastPage} = usePaginate()

    const {filters, handleChange, handleReset, isReset} = UseFilters({params: {status: ""}})

    async function getDocuments() {
        const params = new URLSearchParams(filters).toString()
        const response = await $fetch(`admin/documents?page=${page}&${params}`)

        const documents_ = response?.json?.documents
        const last_page = response?.json?.last_page
        const page_ = response?.json?.current_page
        if (documents_) {
            setDocuments(documents_)
        }
        setLastPage(last_page)
        setPage(page_)
    }

    useEffect(() => {
        getDocuments()
    }, [isReset, page])


    return (
        <div className="flex flex-col gap-4">

            <FilterDocuments
                getDocuments={getDocuments}
                filters={filters}
                handleChange={handleChange}
                handleReset={handleReset}
            />

            {documents?.map((document, key) =>
                <DocumentCard key={key} document={document} />
            )}
            <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
        </div>
    )
}