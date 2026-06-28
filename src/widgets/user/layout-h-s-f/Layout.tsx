"use client"

import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import {ReactNode, useEffect, useState} from "react";
import Sidebar from "@/widgets/user/sidebar/ui/Sidebar";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import {Container} from "@/shared/ui/Container/Container";

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
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    }, []);

    return (
        <div className="h-screen overflow-y-auto">

            <HeaderWidget />

            <Container className={`flex gap-4 items-start mt-6 flex-col lg:flex-row pb-10 ${className}`}>
                {hasSidebar && (
                    <div className="sticky self-start"
                        style={{
                            top: `${headerHeight + 16}px`,
                        }}
                    >
                        <Sidebar className="w-full" />
                    </div>
                )}

                {children}


                {/* ПРАВЫЙ САЙДБАР */}
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