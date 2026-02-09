"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserContext} from "@/entities/user";

export function CheckUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            toast.error("Вы не авторизованы")
            router.replace("/login")
        }
    }, [isLoading, user, router])

    if (isLoading || !user) return null
    return <>{children}</>
}