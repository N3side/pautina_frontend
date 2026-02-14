"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserContext} from "@/entities/user";
import {userLink} from "@/shared/lib/userLink";

export function CheckGuest({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (user && user?.isGuest === false) {
            toast.error("Вы уже зарегистрированы");
            router.replace(userLink(user?.public_url));
        }
    }, [user, router]);

    if (!user || user.isGuest === true) {
        return <>{children}</>;
    }

    return null;
}