"use client"

import LogoLight from "@/shared/vector/logo/LogoLight"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import { WindowContext } from "@/shared/providers/WindowProvider"
import Navigation from "./Navigation"
import { Burger } from "./Burger"
import { BodyBlockContext } from "@/shared/providers/BodyBlockProvider"
import { UserContext } from "@/shared/providers/UserProvider"
import DropDown from "@/shared/components/DropDown"
import Link from "next/link"
import { PautinaText } from "@/shared/cat/typography/text"
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { Switch } from "@mui/material"
import { useTheme } from "@/shared/providers/ThemeProvider"

export default function HeaderWidget() {
    const { setIsBlocked } = useContext(BodyBlockContext)
    const [isActive, setIsActive] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const { user } = useContext(UserContext)

    useEffect(() => {
        setIsBlocked(isActive)
    }, [isActive])

    return (
        // sticky + backdrop-blur + border-b для красивого отделения от контента
        <header className="sticky top-0 z-20 w-full transition-all duration-300 border-b border-border-default/40 bg-surface/80">
            <Container className="flex items-center justify-between w-full py-4 md:py-5">
                {/* Логотип с эффектом при наведении */}
                <Link href="/" className="logo group relative">
                    <LogoLight className="h-8 md:h-10 w-auto fill-text-main transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"/>
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Навигация */}
                    <Navigation isActive={isActive} setIsActive={setIsActive} />

                    {user && (
                        <div className="lg:block z-50">
                            <DropDown
                                trigger={
                                    <div className="h-[42px] w-[42px] p-[2px] rounded-full cursor-pointer border border-transparent hover:border-brand transition-all duration-300 group">
                                        <div className="w-full h-full rounded-full overflow-hidden relative">
                                            <img
                                                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                                                src={user?.avatar}
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                <div className="flex items-center justify-center pt-2" onClick={(e) => e.stopPropagation()}>
                                    <div className="w-[280px] bg-surface rounded-2xl overflow-hidden font-sans border border-border-default shadow-2xl shadow-brand/10 ring-1 ring-black/5">

                                        <div className="p-4 flex gap-3 items-center bg-surface">
                                            <img src={user?.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover shrink-0 border border-border-default" />
                                            <div className="flex flex-col min-w-0">
                                                <PautinaText variant="default" className="text-text-main font-bold truncate">{user?.full_name}</PautinaText>
                                                {user?.nickname && <PautinaText variant="small" className="text-text-muted truncate">@{user?.nickname}</PautinaText>}
                                            </div>
                                        </div>

                                        <div className="px-4 pb-3">
                                            <Link href="/profile" className="block w-full text-center py-2 rounded-lg bg-brand/10 hover:bg-brand/20 text-text-brand text-sm font-medium transition-colors">
                                                Перейти в профиль
                                            </Link>
                                        </div>

                                        <div className="h-[1px] bg-border-default w-full opacity-50"></div>

                                        <div className="py-2">
                                            <div className="px-2">
                                                <button className="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-border-default/30 transition-colors group">
                                                    <div className="flex items-center gap-3">
                                                        <PautinaText variant="small" className="text-text-main font-medium">Темная тема</PautinaText>
                                                    </div>
                                                    <Switch size="small" checked={theme === "dark"} onClick={toggleTheme} />
                                                </button>

                                                <Link href="/settings">
                                                    <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-border-default/30 transition-colors group mt-1">
                                                        <SettingsIcon fontSize="small" className="text-text-muted group-hover:text-text-main transition-colors" />
                                                        <PautinaText variant="small" className="text-text-muted group-hover:text-text-main transition-colors">Настройки</PautinaText>
                                                    </button>
                                                </Link>
                                            </div>

                                            <div className="h-[1px] bg-border-default w-full my-2 opacity-50"></div>

                                            <div className="px-2">
                                                <Link href="/logout">
                                                    <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-red-500/10 transition-colors group">
                                                        <LogoutIcon fontSize="small" className="text-text-muted group-hover:text-red-500 transition-colors" />
                                                        <PautinaText variant="small" className="text-text-muted group-hover:text-red-500 transition-colors">Выйти</PautinaText>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropDown>
                        </div>
                    )}

                    {/* Бургер (виден только на мобильных) */}
                    <div className="flex max-[900px]:flex gap-[20px] items-center relative z-50 lg:hidden">
                        <Burger isActive={isActive} setIsActive={setIsActive} />
                    </div>

                </div>
            </Container>
        </header>
    )
}