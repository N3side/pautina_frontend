"use client"

import { COLORS, colorStyles } from "@/shared/cat/colors"
import { PautinaText } from "@/shared/cat/typography/text"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import { Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { model } from "../model"
import Link from "next/link"
import { UserContext } from "@/shared/providers/UserProvider";

interface Props {
    isActive?: boolean, // Исправил на маленькую букву (примитив)
}

export default function Navigation({ isActive }: Props) {
    const [isClient, setIsClient] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div
            className={`
                /* Мобильные стили (по умолчанию) */
                fixed top-0 w-screen h-[calc(100vh-80px)] mt-[80px] bg-white z-20 
                flex flex-col items-start justify-center gap-5 px-10 transition-all duration-300 ease-in-out
                ${isActive ? "right-0" : "-right-[110%]"}

                /* Десктоп стили (от lg и выше) */
                lg:static lg:w-auto lg:h-auto lg:mt-0 lg:bg-transparent lg:z-auto
                lg:flex-row lg:items-center lg:gap-[60px] lg:p-0 lg:right-0
            `}
        >
            <nav className="nav">
                <ul className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-10">
                    {model.map((li, i) =>
                        <li key={i}>
                            <Link href={li?.link}>
                                <PautinaText
                                    /* Оставляем логику выбора варианта, так как это пропс компонента */
                                    variant="small"
                                    className="cursor-pointer whitespace-nowrap"
                                    style={{fontWeight: 600}}
                                >
                                    {li?.text}
                                </PautinaText>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            {!user && isClient && !localStorage.getItem("token") && (
                <div className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center">
                    <Link href="/login">
                        <Button className="py-2.5 rounded-xl" style={{
                            padding: "10px 20px",
                            borderRadius: "9999px",
                            textTransform: "none"
                        }}>
                            <PautinaText variant="button2">
                                Войти
                            </PautinaText>
                        </Button>
                    </Link>
                    <Link href="/register">
                        <ShadowWrapper>
                            <Button className="px-5 py-2.5" style={{
                                background: colorStyles.buttons.secondary.light,
                                padding: "10px 20px",
                                borderRadius: "9999px",
                                textTransform: "none"
                            }}>
                                <PautinaText variant="button2" color={COLORS.white}>
                                    Регистрация
                                </PautinaText>
                            </Button>
                        </ShadowWrapper>
                    </Link>
                </div>
            )}
        </div>
    )
}