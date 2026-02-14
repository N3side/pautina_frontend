"use client"

import {ShadowWrapper} from "@/shared/ui/Wrappers/Shadow"
import {Button} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import {model} from "../model"
import Link from "next/link"
import {usePathname} from "next/navigation" // Добавляем хук для активной ссылки
import {UserContext} from "@/entities/user";
import {ThemeSwitch} from "@/shared/ui/Buttons/ThemeSwitch";
import {useTheme} from "@/shared/lib/providers/ThemeProvider";
import {IOSSwitch} from "@/shared/ui/Inputs/IOSSwitch";


interface Props {
    isActive?: boolean
    setIsActive?: (v: boolean) => void // Добавил, чтобы закрывать меню при клике на ссылку
}

export default function Navigation({ isActive, setIsActive }: Props) {
    const { user } = useContext(UserContext)
    const pathname = usePathname() // Получаем текущий путь


    // Функция закрытия меню (для мобильных)
    const closeMenu = () => {
        if (setIsActive) setIsActive(false)
    }

    const {theme, toggleTheme} = useTheme()

    const [mounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!mounted) return null

    return (
        <>

            <div
                className={`
                    fixed inset-0 bg-black/40 backdrop-blur-sm z-10 lg:hidden transition-opacity duration-300
                    ${isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
                `}
                onClick={closeMenu}
            />

            <div
                className={`
                    fixed top-0 right-0 h-screen w-[80vw] bg-surface/95 backdrop-blur-xl z-20 
                    border-l border-border-default/50 shadow-2xl
                    flex flex-col items-start pt-[100px] px-8 gap-8 transition-transform duration-300 ease-out
                    ${isActive ? "translate-x-0" : "translate-x-full"}

                    lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:shadow-none lg:border-none lg:backdrop-blur-none
                    lg:flex-row lg:items-center lg:gap-8 lg:p-0 lg:pt-0 lg:translate-x-0 lg:z-auto
                `}
            >
                <nav className="w-full lg:w-auto">
                    <ul className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
                        {model.map((li, i) => {
                            // Проверка на активную ссылку
                            const isLinkActive = pathname === li?.link;

                            return (
                                <li key={i} className="relative group w-full lg:w-auto">
                                    <Link href={li?.link} onClick={closeMenu} className="block w-full">
                                        <p
                                            className={`
                                                text-small cursor-pointer whitespace-nowrap transition-colors duration-200 font-semibold text-[15px]
                                                text-text-muted group-hover:text-text-main
                                            `}
                                        >
                                            {li?.text}
                                        </p>

                                        {/* Индикатор активной ссылки (точка снизу на десктопе) */}
                                        <span className={`
                                            hidden lg:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand transition-all duration-300
                                            "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75"}
                                        `}></span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {!user && (

                    <div className="flex flex-col w-full gap-3 mt-4 lg:mt-0 lg:flex-row lg:w-auto lg:gap-3">
                        <Link href="/login" onClick={closeMenu} className="w-full lg:w-auto">
                            <Button
                                className="!w-full lg:!w-auto !py-2 !rounded-xl !px-5 !normal-case !text-text-main hover:!bg-border-default/50 transition-all border border-transparent hover:border-border-default/50"
                            >
                                <p className="text-button-sm">
                                    Войти
                                </p>
                            </Button>
                        </Link>

                        <Link href="/register" onClick={closeMenu} className="w-full lg:w-auto">
                            <ShadowWrapper className="w-full lg:w-auto">
                                <Button
                                    className="!w-full lg:!w-auto !px-6 !py-2 !rounded-xl !normal-case !bg-brand hover:!bg-brand-hover !shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] transition-all transform hover:-translate-y-0.5"
                                >
                                    <p className="text-button-sm text-white font-bold">
                                        Регистрация
                                    </p>
                                </Button>
                            </ShadowWrapper>
                        </Link>
                    </div>
                )}

            </div>
        </>
    )
}