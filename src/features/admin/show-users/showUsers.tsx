"use client"

import {useEffect, useState} from "react";
import UserCard from "../../../entities/admin/user-card/userCard";
import {$fetch} from "@/shared/api/fetch";
import usePaginate from "@/shared/lib/hooks/usePaginate"
import Pagination from "@/features/pagination/ui/Pagination";
import FilterUsers from "@/features/admin/filter-users/filterUsers"
import UseFilters from "@/shared/lib/hooks/useFilters";

export default function ShowUsers() {

    const [users, setUsers] = useState<Record<string, any> | null>(null)
    const {page, setPage, lastPage, setLastPage} = usePaginate()

    const {filters, handleChange, handleReset, isReset} = UseFilters({params: {name: "", subscription_name: ""}})

    async function getUsers() {
        const params = new URLSearchParams(filters).toString()
        const response = await $fetch(`admin/users?page=${page}&${params}`)

        const users_ = response?.json?.users
        const last_page = response?.json?.last_page
        const page_ = response?.json?.current_page
        if (users_) {
            setUsers(users_)
        }
        setLastPage(last_page)
        setPage(page_)
    }

    useEffect(() => {
        getUsers()
    }, [isReset, page])


    return (
        <div className="flex flex-col gap-4">

            <FilterUsers
                getUsers={getUsers}
                filters={filters}
                handleChange={handleChange}
                handleReset={handleReset}
            />

            {users?.map((user, key) =>
                <UserCard key={key} user={user} />
            )}
            <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
        </div>
    )
}