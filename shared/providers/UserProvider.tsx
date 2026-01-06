"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export const UserContext = createContext(null)

export default function UserProvider({children}: ReactNode) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getUser() {
        const response = await $fetch("me", {isToast: false})

        setUser(response?.json?.user)

        setIsLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [token]);

    return (
        <UserContext.Provider value={{user, setUser, token, setToken, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )

}

export function CheckUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading, setUser } = useContext(UserContext)
    const router = useRouter()

    if (!localStorage.getItem("token")) {
        toast.error("Вы не авторизованы")
        router.push("/login")
    }

    useEffect(() => {

        if (isLoading) {
            const id = toast.loading("Проверка авторизации...")
            return () => toast.dismiss(id)
        }

        if (!user) {
            setUser(null)
            toast.error("Вы не авторизованы")
            router.push("/login")
        }

    }, [isLoading, user, router]);

    if (isLoading) return

    if (!user) {
        setUser(null)
        return
    }

    return children
}

export function CheckIsNotUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading, setUser } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {

        if (isLoading) {
            const id = toast.loading("Проверка авторизации...")
            return () => toast.dismiss(id)
        }

        if (user) {
            toast.success("Вы авторизованы")
            router.push("/profile")
            return
        }

    }, [isLoading, user, router])

    if (isLoading) return

    if (user) return

    return children
}