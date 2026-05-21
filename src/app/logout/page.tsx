"use client"

import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect} from "react";
import {UserContext} from "@/entities/user";
import {useRouter} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";
import {homeLink} from "@/shared/lib/utils/userLink";

export default function Page() {

    const {setUser, setToken} = useContext(UserContext)

    const router = useRouter()

    async function logout() {

        setToken(null)
        setUser(null)
        $fetch("auth/logout")

        await safeCookieStorage.removeItem("token")
        await DeleteRegistrationInfo()
        await DeleteAuthorizationInfo()

        await setTimeout(() => {
            router.push(homeLink)
        }, 100)

    }

    useEffect(() => {
        logout()
    }, []);

    return (
        <>Выход</>
    )
}