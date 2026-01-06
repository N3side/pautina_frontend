"use client"

import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect} from "react";
import {UserContext} from "@/shared/providers/UserProvider";
import {useRouter} from "next/navigation";

export default function page() {

    const {setUser, setToken} = useContext(UserContext)

    const router = useRouter()

    async function logout() {

        const response = await $fetch("auth/logout")

        setToken(null)
        setUser(null)
        localStorage.removeItem("token")

        router.push("/")
    }

    useEffect(() => {
        logout()
    }, []);

    return (
        <>Выход</>
    )
}