"use client"

import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect} from "react";
import {UserContext} from "@/entities/user";
import {useRouter} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";

export default function LogoutPage() {

    const {setUser, setToken} = useContext(UserContext)

    const router = useRouter()

    async function logout() {

        const response = await $fetch("auth/logout")

        setToken(null)
        setUser(null)
        safeCookieStorage.removeItem("token")
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