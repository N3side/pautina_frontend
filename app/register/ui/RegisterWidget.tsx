"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/cat/colors"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import {UserContext, CheckIsNotUser, CheckGuest} from "@/shared/providers/UserProvider"
import Name from "@/app/register/ui/Name"
import Email from "@/app/register/ui/Email"
import OTP from "@/app/register/ui/OTP"
import City from "@/app/register/ui/City"
import Source from "@/app/register/ui/Source"
import Activity from "@/app/register/ui/Activity"
import Password from "@/app/register/ui/Password"
import { ReactElement } from "react"
import Card1 from "@/shared/components/Sections/Card1";
import {Button} from "@mui/material";

export default function RegisterWidget() {
    const { setToken, setUser } = useContext(UserContext)
    const { _window } = useContext(WindowContext)

    // Инициализируем состояния без localStorage при первом рендере
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<number>(0)
    const [otp, setOtp] = useState<string | null>(null)

    // Флаг для отслеживания монтирования компонента
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        // Загружаем данные из localStorage только после монтирования
        if (typeof window !== 'undefined') {
            setName(localStorage.getItem("user_name"))
            setEmail(localStorage.getItem("user_email"))
            setPosition(Number(localStorage.getItem("register_position")) || 0)
            setOtp(localStorage.getItem("email_otp"))
        }
    }, [])

    const handlers = {
        next: (): void => setPosition((p: number) => p + 1),
        prev: (): void => setPosition((p: number) => p > 0 ? p - 1 : p),
    }

    const positions: ReactElement[] = [
        <Name key="name" name={name} setName={setName} {...handlers} />,
        <Email key="email" name={name} email={email} setEmail={setEmail} {...handlers} />,
        <OTP key="otp" name={name} email={email} {...handlers} otp={otp} setOtp={setOtp} />,
        <City key="city" {...handlers} />,
        <Source key="source" {...handlers} />,
        <Activity key="activity" {...handlers} />,
        <Password key="password" />,
    ]

    useEffect(() => {
        if (isMounted && typeof window !== 'undefined') {
            localStorage.setItem("register_position", position.toString())
        }
    }, [position, isMounted])

    if (!isMounted) {
        return null
    }

    const progress = ((position ) / positions.length) * 100;

    return (
        <CheckGuest>
            <Container
                className="min-h-[calc(100vh-80px)] px-0 lg:mt-5 lg:flex lg:items-center lg:px-4"
            >
                <Card1>

                    <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
                        <div
                            className="h-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%`, background: colorStyles.text.accent.light }}
                        />
                    </div>

                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {positions[position]}
                    </div>

                    <Button  style={{width: "100%", marginTop: "10px"}} onClick={handlers.prev}>
                        Назад
                    </Button>

                </Card1>
            </Container>
        </CheckGuest>
    )
}