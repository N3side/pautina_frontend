"use client"

import LogoLight from "@/shared/vector/logo/LogoLight"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import Navigation from "./Navigation"
import { Burger } from "./Burger"
import { BodyBlockContext } from "@/shared/providers/BodyBlockProvider"
import { UserContext } from "@/shared/providers/UserProvider"
import Link from "next/link"
import { useTheme } from "@/shared/providers/ThemeProvider"
import {ThemeSwitch} from "@/shared/components/Buttons/ThemeSwitch";
import CustomDropDown from "@/app/widgets/header/ui/CustomDropDown";

export default function HeaderWidget() {
    const { setIsBlocked } = useContext(BodyBlockContext)
    const [isActive, setIsActive] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const { user } = useContext(UserContext)

    useEffect(() => {
        setIsBlocked(isActive)
    }, [isActive])

    return (
        <header className="sticky glass-effect top-0 z-20 w-full">
            <Container className="flex items-center justify-between w-full py-4 md:py-5">
                {/* Логотип с эффектом при наведении */}
                <Link href="/" className="logo group relative">
                    <LogoLight className="h-8 md:h-10 w-auto fill-text-main group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"/>
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Навигация */}
                    <Navigation isActive={isActive} setIsActive={setIsActive} />

                    <div className="flex max-[900px]:flex gap-[20px] items-center relative z-50 lg:hidden">
                        <Burger isActive={isActive} setIsActive={setIsActive} />
                    </div>

                    <CustomDropDown />


                    {!user && (
                        <ThemeSwitch
                            size="small"
                            checked={theme === "dark"}
                            onClick={toggleTheme}
                        />
                    )}

                </div>
            </Container>
        </header>
    )
}