"use client"

import { Container } from "@/shared/wrappers/Container"
import { useEffect, useState } from "react"
import {CheckIsNotUser} from "@/shared/providers/UserProvider"
import Email from "@/app/otp_login/ui/Email"
import OTP from "@/app/otp_login/ui/OTP"
import { ReactElement } from "react"
import Card1 from "@/shared/components/Sections/Card1";
// Импортируем motion
import { motion, AnimatePresence } from "framer-motion"
import {Button} from "@mui/material";
import {textSizes} from "@/shared/styles/typography/text";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export default function RegisterWidget() {
    const [email, setEmail] = useState<string | null>(safeLocalStorage.getItem("login_email"))
    const [position, setPosition] = useState<number>(0)

    const [timer, setTimer] = useState(null)

    useEffect(() => {

        setPosition(Number(safeLocalStorage.getItem("login_position")) || 0)
    }, [])

    const handlers = {
        next: (): void => setPosition((p: number) => p + 1),
        prev: (): void => setPosition((p: number) => p > 0 ? p - 1 : p),
    }

    const positions: ReactElement[] = [
        <Email key="email" email={email} setEmail={setEmail} {...handlers} timer={timer} setTimer={setTimer} />,
        <OTP key="otp" email={email} {...handlers} timer={timer} setTimer={setTimer} />,
    ]

    useEffect(() => {
        safeLocalStorage.setItem("login_position", position.toString())
    }, [position])

    return (
        <CheckIsNotUser>
            <Card1>

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
                            fontSize: textSizes.tiny,
                        }}
                        onClick={handlers.prev}
                        className="!text-text-muted !rounded-xl !w-full"
                    >
                        Назад
                    </Button>
                )}

            </Card1>
        </CheckIsNotUser>
    )
}