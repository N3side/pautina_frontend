"use client"

import { useContext } from "react";
import { notFound } from "next/navigation";
import { UserContext } from "../..";

export function CheckCompany({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) {
        return null;
    }

    if (!user || user?.access?.role !== "company") {
        notFound();
    }

    return <>{children}</>;
}