"use client"

import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect} from "react";
import {UserContext} from "@/shared/providers/UserProvider";
import {useRouter} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/utils/deleteRegistrationInfo";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";
import {DeleteAuthorizationInfo} from "@/shared/utils/deleteAuthorizationInfo";

export default function page() {

    const {setUser, setToken, setIsLoading} = useContext(UserContext)

    const router = useRouter()

    async function logout() {

        const response = await $fetch("auth/logout")

        setToken(null)
        setUser(null)
        safeLocalStorage.removeItem("token")
        DeleteRegistrationInfo()
        DeleteAuthorizationInfo()

        router.push("/")
    }

    useEffect(() => {
        logout()
    }, []);

    return (
        <>Выход</>
    )
}