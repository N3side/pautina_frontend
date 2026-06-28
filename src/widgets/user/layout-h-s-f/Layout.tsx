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
        // Находим хедер по классу или id
        const header = document.querySelector('header'); // или ваш селектор
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    }, []);

    return (
        // ГЛАВНЫЙ КОНТЕЙНЕР - занимает всю высоту экрана и скроллится
        <div className="h-screen overflow-y-auto">
            <HeaderWidget />

            {/* КОНТЕЙНЕР - просто центрирует контент */}
            <Container className={`flex gap-4 items-start mt-6 flex-col lg:flex-row pb-10 ${className}`}>
                {/* САЙДБАР - sticky привязан к верху с отступом */}
                {hasSidebar && (
                    <div
                        style={{
                            position: 'sticky',
                            top: `${headerHeight + 16}px`,
                            alignSelf: 'flex-start'
                        }}
                    >
                        <Sidebar className="w-full" />
                    </div>
                )}

                {children}


                {/* ПРАВЫЙ САЙДБАР */}
                {rightChildren && (
                    <div
                        className="hidden lg:block w-full lg:max-w-[350px] flex-shrink-0"
                        style={{
                            position: 'sticky',
                            top: `${headerHeight + 16}px`,
                            alignSelf: 'flex-start'
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