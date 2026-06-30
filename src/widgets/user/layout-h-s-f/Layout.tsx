"use client"

import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import {ReactNode, useEffect, useState} from "react";
import Sidebar from "@/widgets/user/sidebar/ui/Sidebar";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import {Container} from "@/shared/ui/Container/Container";
import {useHeaderHeight} from "@/shared/lib/hooks/useHeaderHeight";

interface Props {
    children: ReactNode
    className?: string,
    hasSidebar?: boolean
    rightChildren?: ReactNode
}

export default function Layout({
       children,
       rightChildren,
       className,
       hasSidebar = true,
   }: Props) {

    const {headerHeight} = useHeaderHeight()

    return (
        <div className="h-screen overflow-y-auto">

            <HeaderWidget />

            <Container className={`flex gap-4 items-start mt-6 flex-col lg:flex-row pb-10 ${className}`}>
                {hasSidebar && (
                    <div className="lg:sticky lg:self-start lg:w-[230px] w-full"
                        style={{
                            top: `${headerHeight + 16}px`,
                        }}
                    >
                        <Sidebar />
                    </div>
                )}

                {children}

                {rightChildren && (
                    <div
                        className="hidden lg:block w-full lg:max-w-[350px] flex-shrink-0 self-start sticky"
                        style={{
                            top: `${headerHeight + 16}px`,
                        }}
                    >
                        {rightChildren}
                    </div>
                )}
            </Container>

            <FooterWidget />
        </div>
    );
}