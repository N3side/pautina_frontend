"use client"

import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {UserContext} from "@/entities/user";

export function CheckAdmin({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {

        if (isLoading) return
        if (user && user?.access?.role !== "admin") {
            router.back();
            toast.error("Вам сюда нельзя :)");
        }
    }, [user, router]);

    if (user && user?.access?.role === "admin") {
        return <>{children}</>;
    }

    return null;
}