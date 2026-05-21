"use client"

import {ShadowWrapper} from "@/shared/ui/Shadow/Shadow"
import {Button} from "@mui/material"
import {useContext, useEffect, useState} from "react"
import {model} from "../model"
import Link from "next/link"
import {UserContext} from "@/entities/user";
import NavigationLink from "@/shared/ui/Navigation/NavigationLink";
import PromoTimer from "@/entities/promo-timer/PromoTimer";


interface Props {
    isActive?: boolean
    setIsActive?: (v: boolean) => void
}

export default function Navigation({ isActive, setIsActive }: Props) {
    const { user } = useContext(UserContext)

    const closeMenu = () => {
        if (setIsActive) setIsActive(false)
    }

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
                    <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">

                        {model.map((li, i) =>
                            <NavigationLink key={i} href={li?.link} onClick={closeMenu}>
                                {li?.text}
                            </NavigationLink>
                        )}

                        <NavigationLink>
                            Платформа находится в разработке
                        </NavigationLink>

                        {
                            user?.access?.role === "admin" &&
							<NavigationLink href={"/admin"} onClick={closeMenu}>
								Админ-панель
							</NavigationLink>
                        }

                        <PromoTimer />

                    </div>
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
                                    className="!w-full lg:!w-auto !px-6 !py-2 !rounded-xl !normal-case !bg-brand hover:!bg-brand-hover !shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] !transition-all !duration-300 transform hover:-translate-y-0.5"
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