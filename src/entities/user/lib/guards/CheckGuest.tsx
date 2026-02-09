"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserContext} from "@/entities/user";

export function CheckGuest({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (user && user?.isGuest === false) {
            toast.error("Вы уже зарегистрированы");
            router.replace("/profile");
        }
    }, [user, router]);

    if (!user || user.isGuest === true) {
        return <>{children}</>;
    }

    return null;
}