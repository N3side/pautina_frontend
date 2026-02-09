"use client"

import { useEffect, useState } from "react"
import { CheckGuest} from "@/entities/user/lib/guards/CheckGuest";
import Name from "@/widgets/register/ui/Name"
import Email from "@/widgets/register/ui/Email"
import OTP from "@/widgets/register/ui/OTP"
import City from "@/widgets/register/ui/City"
import Source from "@/widgets/register/ui/Source"
import Activity from "@/widgets/register/ui/Activity"
import Password from "@/widgets/register/ui/Password"
import Card1 from "@/shared/ui/Sections/Card1";
import { Button } from "@mui/material";
import {PautinaText, textSizes} from "@/shared/styles/typography/text";
import { motion, AnimatePresence } from "framer-motion"
import {useTheme} from "@/shared/lib/providers/ThemeProvider";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function RegisterWidget() {
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [position, setPosition] = useState<number>(0)
    const [otp, setOtp] = useState<string | null>(null)
    const {theme} = useTheme()

    const [timer, setTimer] = useState(null)

    useEffect(() => {
        setName(safeLocalStorage.getItem("user_name"))
        setEmail(safeLocalStorage.getItem("user_email"))
        setPosition(Number(safeLocalStorage.getItem("register_position")) || 0)
        setOtp(safeLocalStorage.getItem("email_otp"))
    }, [])

    const handlers = {
        next: (): void => setPosition((p: number) => p + 1),
        prev: (): void => setPosition((p: number) => p > 0 ? p - 1 : p),
    }

    const steps = [
        { component: position === 0 && <Name key="name" name={name} setName={setName} {...handlers} />, required: true},
        { component: position === 1 && <Email key="email" name={name} email={email} setEmail={setEmail} {...handlers} setTimer={setTimer} position={position} />, required: true },
        { component: position === 2 && <OTP key="otp" name={name} email={email} {...handlers} otp={otp} setOtp={setOtp} position={position} timer={timer} setTimer={setTimer} />, required: true },
        { component: position === 3 && <City key="city" {...handlers} />, required: false },
        { component: position === 4 && <Source key="source" {...handlers} />, required: true },
        { component: position === 5 && <Activity key="activity" {...handlers} />, required: false },
        { component: position === 6 && <Password key="password" />, required: true },
    ];

    const currentStep = steps[position]
    const isRequired = currentStep?.required

    useEffect(() => {
        safeLocalStorage.setItem("register_position", position.toString())
    }, [position])

    const progress = ((position) / steps.length) * 100;


    return (

        <div>
            <Card1>
                {/* Прогресс-бар тоже можно сделать через motion для плавности */}
                <div className={`w-full h-1.5 rounded-full mb-8 bg-${ theme === "light" ? "text-main" : "text-muted" } relative`}>
                    <motion.div
                        className="h-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            background: "var(--color-brand)",
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

                <div className="relative w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={position} // Важно! При смене ключа срабатывает анимация
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full"
                        >
                            {currentStep?.component}
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

            <AnimatePresence>
                {!isRequired && (
                    <motion.div
                        key="skip-button"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                        className="fixed right-[4%] bottom-[4%] z-50"
                    >
                        <Button
                            onClick={handlers?.next}
                            // Стилизация кнопки
                            className={`
                                !rounded-2xl !px-5 !py-3 !normal-case
                                !text-slate-600 dark:!text-slate-300
                                hover:glass-effect
                                hover:!scale-[1.02] 
                                active:!scale-[0.98]
                                !transition-all !duration-300
                                flex gap-2 items-center
                            `}
                        >
                            <p
                                className="text-tiny font-medium opacity-80 group-hover:opacity-100 transition-opacity"
                            >
                                Пропустить
                            </p>

                            <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                            >
                                <ChevronRightIcon className="!w-5 !h-5 opacity-70" />
                            </motion.div>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    )
}