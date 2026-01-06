"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/styles/colors"
import { PautinaText } from "@/shared/styles/typography/text"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import { Button, Container } from "@mui/material"
import {useContext, useEffect, useState} from "react"
import { model } from "../model"
import Link from "next/link"
import {UserContext} from "@/shared/providers/UserProvider";

interface Props {
    isActive?: Boolean,
}

export default function Navigation({ isActive }: Props) {

    const { _window } = useContext(WindowContext)

    const [isClient, setIsClient] = useState(false)

    const {user} = useContext(UserContext)

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div
            className="flex gap-[60px] items-center"

            style={_window?.innerWidth && _window?.innerWidth <= 900 ? {
                position: "fixed",
                width: "100vw",
                height: `calc(100vh - 80px)`,
                top: "0",
                // bottom: "0",
                right: `${isActive ? "0" : "-110%"}`,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: "white",
                zIndex: "20",
                transition: ".3s ease-in-out all",
                alignItems: "flex-start",
                padding: "0px 40px",
                marginTop: `80px`,
                justifyContent: "center"
            } : {}}

        >
            <nav className="nav">
                <ul
                    className="flex items-center gap-10"
                    style={_window?.innerWidth && _window?.innerWidth <= 900 ? {
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        alignItems: "flex-start",
                        top: ``
                    } : {}}
                >
                    {model.map((li, i) =>
                        <li key={i}>
                            <Link href={li?.link}>
                                <PautinaText variant={`${_window?.innerWidth && _window?.innerWidth >= 900 ? "small" : "large"}`} className="cursor-pointer whitespace-nowrap" style={{ fontWeight: 600 }}>
                                    {li?.text}
                                </PautinaText>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            {!user && isClient && !localStorage.getItem("token") && (
                <div
                    className="flex items-center gap-2.5"
                    style={_window?.innerWidth && _window?.innerWidth <= 900 ? {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    } : {}}
                >
                    <Link href="/login">
                        <Button className="py-2.5 rounded-xl" style={{
                            padding: "10px 20px",
                            borderRadius: "9999px",
                            textTransform: "none"
                        }}>
                            <PautinaText variant={`${_window?.innerWidth && _window?.innerWidth >= 900 ? "button2" : "button"}`}>
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
                                <PautinaText variant={`${_window?.innerWidth && _window?.innerWidth >= 900 ? "button2" : "button"}`} color={COLORS.white}>
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