"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserContext} from "../..";
import {userLink} from "@/shared/lib/utils/userLink";

export function CheckGuest({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (user && user?.access?.isGuest === false) {
            toast.error("Вы уже зарегистрированы");
            router.replace(userLink(user?.main?.short_id));
        }
    }, [user, router]);

    if (!user || user?.access?.isGuest === true) {
        return <>{children}</>;
    }

    return null;
}