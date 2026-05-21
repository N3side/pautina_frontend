"use client"

import AdminHeader from "@/widgets/admin/admin-layout/ui/AdminHeader";
import {SidebarWidget} from "@/widgets/admin/sidebar/ui/SidebarWidget";
import {ReactNode} from "react";
import AdminContainer from "@/shared/ui/Container/AdminContainer";
import {useMediaQuery} from "@mui/material";
import BurgerWidget from "@/widgets/admin/sidebar/ui/BurgerWidget";
import {useSidebarStore} from "@/widgets/admin/sidebar/lib/useSidebarStore";
import {ThemeProvider} from "@/shared/lib/providers/ThemeProvider";

interface Props {
    children?: ReactNode
}

export default function AdminLayout({children}: Props) {

    const matches = useMediaQuery("(max-width: 968px)")

    const { isExpanded } = useSidebarStore();

    return (
        <div className="flex max-w-[100vw]">
            {matches ? <BurgerWidget isOpen={isExpanded} /> : <SidebarWidget />}

            <div className="flex flex-col gap-[30px] w-full">
                <AdminContainer className="flex flex-col gap-8">
                    <AdminHeader />
                    {children}
                </AdminContainer>
            </div>
        </div>
    )
}