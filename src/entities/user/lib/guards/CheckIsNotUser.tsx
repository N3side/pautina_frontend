"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import {UserContext} from "../..";
import {userLink} from "@/shared/lib/utils/userLink";

export function CheckIsNotUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && user) {
            router.replace(userLink(user?.main?.short_id))
        }
    }, [isLoading, user, router])

    if (isLoading || user) return null
    return <>{children}</>
}
