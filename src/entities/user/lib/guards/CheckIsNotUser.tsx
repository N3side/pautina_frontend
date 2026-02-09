"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import {UserContext} from "@/entities/user";

// ВНИМАНИЕ
// он проверяет не пропускает не только неавторизованного, но и гостя

export function CheckIsNotUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {

        if (!isLoading && user) {
            router.replace("/profile")
        }
    }, [isLoading, user, router])

    if (isLoading || user) return null
    return <>{children}</>
}
