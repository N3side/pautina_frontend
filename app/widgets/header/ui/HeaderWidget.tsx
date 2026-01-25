"use client"

import LogoLight from "@/shared/vector/logo/LogoLight"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import { WindowContext } from "@/shared/providers/WindowProvider"
import Navigation from "./Navigation"
import { Burger } from "./Burger"
import { BodyBlockContext } from "@/shared/providers/BodyBlockProvider";
import { UserContext } from "@/shared/providers/UserProvider";
import Dropdown from "@/shared/components/Dropdown";
import Link from "next/link";
import {PautinaText} from "@/shared/cat/typography/text";
import Settings from "@/shared/vector/Settings";
import Logout from "@/shared/vector/Logout";
import {colorStyles} from "@/shared/cat/colors";

export default function HeaderWidget() {

    const { _window } = useContext(WindowContext)
    const { setIsBlocked } = useContext(BodyBlockContext)
    const [isActive, setIsActive] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setIsBlocked(isActive)
    }, [isActive])

    // Функция для выхода (пример)
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <header className="bg-white w-full">
            <Container className="flex items-center w-full justify-between py-5">
                <div className="logo">
                    <LogoLight className="aspect-[130_/_40] w-[clamp(91px,2.438vw_+_83.200px,130px)]"/>
                </div>


                <div className="flex gap-4 items-center">

                    <Navigation isActive={isActive} />

                    {_window?.innerWidth && _window?.innerWidth < 900 &&
						<div className="flex gap-[20px] items-center">
							<Burger isActive={isActive} setIsActive={setIsActive} />
						</div>
                    }

                    {user && typeof window !== 'undefined' && localStorage.getItem("token") && (
                        /* ВАЖНО: Мы убрали лишний div-обертку.
                           Сам Dropdown теперь является контейнером логики.
                        */
                        <Dropdown
                            /* Передаем аватарку как триггер */
                            trigger={
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition border border-gray-200">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={user?.avatar || ""} // Добавь заглушку, если аватара нет
                                        alt="avatar"
                                    />
                                </div>
                            }
                            // menuClassName="mt-2 min-w-[150px]"
                        >
                            {/* Содержимое меню */}

                            <div className="flex items-center justify-center">

                                <div
                                    className="w-[300px] bg-[white] text-white rounded-xl overflow-hidden font-sans">

                                    <div className="p-5 flex gap-3 items-start">
                                        <img
                                            src={user?.avatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full object-cover shrink-0 bg-gray-600"
                                        />

                                        <div className="flex flex-col overflow-hidden">
                                            <PautinaText variant={"default"} className="font-normal text-base truncate">{user?.full_name}</PautinaText>

                                            {user?.nickname && (
                                                <PautinaText variant={"small"} className="font-normal text-sm text-[#AAAAAA] truncate">@{user?.nickname}</PautinaText>
                                            )}

                                            <Link href="/profile">
                                                <PautinaText variant={"small"} color={colorStyles.text.accent.light} style={{fontWeight: 500}}>
                                                    Перейти в профиль
                                                </PautinaText>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="h-[1px] bg-gray-200 w-full"></div>

                                    <div className="py-2">

                                        <Link href={"logout"} >
                                            <button
                                                className="w-full text-left px-4 py-2.5 flex items-center gap-4 hover:bg-[#f3f3f3] transition-colors group">
                                                <Logout />
                                                <PautinaText variant={"small"}>Выйти</PautinaText>
                                            </button>
                                        </Link>

                                        <Link href={"settings"} >
                                            <button
                                                className="w-full text-left px-4 py-2.5 flex items-center gap-4 hover:bg-[#f3f3f3] transition-colors group">
                                                <Settings />
                                                <PautinaText variant={"small"}>Настройки</PautinaText>
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            </div>

                        </Dropdown>
                    )}
                </div>
            </Container>
        </header>
    )
}