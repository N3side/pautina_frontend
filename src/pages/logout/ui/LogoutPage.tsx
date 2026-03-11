"use client"

import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect} from "react";
import {UserContext} from "@/entities/user";
import {useRouter} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";
import {homeLink} from "@/shared/lib/userLink";

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

        router.push(homeLink)
    }

    useEffect(() => {
        logout()
    }, []);

    return (
        <>Выход</>
    )
}