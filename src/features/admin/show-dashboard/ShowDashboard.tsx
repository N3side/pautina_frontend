"use client"

import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";

export default function ShowDashboard() {

    const [info, setInfo] = useState<Record<string, any> | null>(null)

    async function getDashboard() {
        const response = await $fetch("admin/dashboard")

        const info_ = response?.json
        setInfo(info_)
    }

    useEffect(() => {
        getDashboard()
    }, []);

    return (
        <div>
            <h6 className="text-text-main font-bold">
                Кол-во пользователей: {info?.users_count}
            </h6>
        </div>
    )
}