"use client"

import LogoLight from "@/shared/assets/images/vector/logo/LogoLight"
import {Container} from "@/shared/ui/Container/Container"
import {useContext, useEffect, useState} from "react"
import Navigation from "./Navigation"
import {Burger} from "./Burger"
import {BodyBlockContext} from "@/shared/lib/providers/BodyBlockProvider"
import {UserContext} from "@/entities/user";
import Link from "next/link"
import {useTheme} from "@/shared/lib/providers/ThemeProvider";
import {ThemeSwitch} from "@/shared/ui/Buttons/ThemeSwitch";
import CustomDropDown from "@/widgets/user/header/ui/CustomDropDown";
import {smooth} from "@/shared/styles/animations";
import {homeLink} from "@/shared/lib/utils/userLink";

export default function HeaderWidget() {
    const [isActive, setIsActive] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user } = useContext(UserContext)


    return (
        <header className="sticky glass-effect top-[-5px] z-20 w-full">
            <Container className="flex items-center justify-between w-full py-4 md:py-5">
                {/* Логотип с эффектом при наведении */}
                <Link href={homeLink} className={`logo group relative ${smooth} hover:scale-105 px-4`}>
                    <LogoLight className="h-8 md:h-10 w-auto fill-text-main group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"/>
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
                            className="!z-[2000000] !relative"
                            size="small"
                            checked={theme === "dark"}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        />
                    )}

                </div>
            </Container>
        </header>
    )
}