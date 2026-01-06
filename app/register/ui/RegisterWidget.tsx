"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/styles/colors"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import { UserContext, CheckIsNotUser } from "@/shared/providers/UserProvider"
import Name from "@/app/register/ui/Name"
import Email from "@/app/register/ui/Email"
import OTP from "@/app/register/ui/OTP"
import City from "@/app/register/ui/City"
import Source from "@/app/register/ui/Source"
import Activity from "@/app/register/ui/Activity"
import Password from "@/app/register/ui/Password"
import { ReactElement } from "react"

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
        prev: (): void => setPosition((p: number) => p - 1),
    }

    const positions: ReactElement[] = [
        <Name key="name" name={name} setName={setName} {...handlers} />,
        <Email key="email" name={name} email={email} setEmail={setEmail} {...handlers} />,
        <OTP key="otp" name={name} email={email} {...handlers} otp={otp} setOtp={setOtp} />,
        <City key="city" {...handlers} />,
        <Source key="source" />,
        <Activity key="activity" />,
        <Password key="password" />,
    ]

    useEffect(() => {
        if (isMounted && typeof window !== 'undefined') {
            localStorage.setItem("register_position", position.toString())
        }
    }, [position, isMounted])

    // Если компонент еще не смонтирован, показываем заглушку
    if (!isMounted) {
        return null
    }

    return (
        // <CheckIsNotUser>
        <Container
            className={`min-h-[calc(100vh_-_80px)] ${
                _window?.innerWidth && _window?.innerWidth < 1024
                    ? "px-[0px]"
                    : "mt-[20px] flex items-center"
            }`}
        >
            <section
                className={`flex items-center flex-col w-full mx-auto my-0
                    px-[clamp(20px,1.250vw_+_16.000px,40px)] bg-white m-[auto 0] ${
                    _window?.innerWidth && _window?.innerWidth < 1024
                        ? "w-full h-[calc(100vh_-_80px)] px-[0px] bg-[red] py-[20px] justify-center"
                        : "py-[50px] rounded-[24px] max-w-[580px] max-h-[875px]"
                }`}
                style={
                    _window?.innerWidth && _window?.innerWidth >= 1024
                        ? {
                            border: `1px solid ${COLORS.gray[2]}`,
                            boxShadow: `0px 1px 16px rgba(0,0,0,.08)`,
                        }
                        : {}
                }
            >
                <div className="w-full">{positions[position]}</div>
            </section>
        </Container>
        // </CheckIsNotUser>
    )
}