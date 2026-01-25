"use client"

import { colorStyles } from "@/shared/cat/colors"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useState } from "react"
import { UserContext, CheckGuest } from "@/shared/providers/UserProvider"
import Name from "@/app/register/ui/Name"
import Email from "@/app/register/ui/Email"
import OTP from "@/app/register/ui/OTP"
import City from "@/app/register/ui/City"
import Source from "@/app/register/ui/Source"
import Activity from "@/app/register/ui/Activity"
import Password from "@/app/register/ui/Password"
import { ReactElement } from "react"
import Card1 from "@/shared/components/Sections/Card1";
import { Button } from "@mui/material";
import { textSizes } from "@/shared/cat/typography/text";
// Импортируем motion
import { motion, AnimatePresence } from "framer-motion"

export default function RegisterWidget() {
    const { setToken, setUser } = useContext(UserContext)
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<number>(0)
    const [otp, setOtp] = useState<string | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    // Добавим направление анимации (влево/вправо) если захочешь сложнее,
    // но пока сделаем просто мягкое появление (fade + slide)

    useEffect(() => {
        setIsMounted(true)
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

    if (!isMounted) return null

    const progress = ((position) / positions.length) * 100;

    return (
        <CheckGuest>
            <Container className="min-h-[calc(100vh-80px)] bg-white px-0 lg:mt-5 lg:flex lg:items-center lg:bg-transparent">
                <Card1>
                    {/* Прогресс-бар тоже можно сделать через motion для плавности */}
                    <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden bg-gray-100 relative">
                        <motion.div
                            className="h-full relative"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{
                                background: colorStyles.text.accent.light,
                                // Добавляем градиент-блик поверх основного цвета
                                backgroundImage: `linear-gradient(
                                    90deg, 
                                    rgba(255,255,255,0) 0%, 
                                    rgba(255,255,255,0.4) 50%, 
                                    rgba(255,255,255,0) 100%
                                )`,
                                backgroundSize: '200% 100%', // Растягиваем, чтобы было куда двигать блик
                            }}
                        >
                            {/* Анимированный слой с блеском */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    backgroundPosition: ['200% 0%', '-200% 0%'],
                                }}
                                transition={{
                                    duration: 3, // Скорость блеска (3 секунды)
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    backgroundImage: `linear-gradient(
                                        90deg, 
                                        transparent, 
                                        rgba(255,255,255,0.3), 
                                        transparent
                                    )`,
                                    backgroundSize: '50% 100%',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="relative overflow-hidden w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={position} // Важно! При смене ключа срабатывает анимация
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="w-full"
                            >
                                {positions[position]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {position > 0 && (
                        <Button
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                fontSize: textSizes.tiny,
                                borderRadius: "12px",
                                color: "#666"
                            }}
                            onClick={handlers.prev}
                        >
                            Назад
                        </Button>
                    )}
                </Card1>
            </Container>
        </CheckGuest>
    )
}