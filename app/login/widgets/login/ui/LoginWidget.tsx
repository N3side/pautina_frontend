"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/cat/colors"
import { Heading } from "@/shared/cat/typography/headings"
import { PautinaText } from "@/shared/cat/typography/text"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import { Button } from "@mui/material"
import Link from "next/link"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useState, FormEvent, ChangeEvent } from "react"
import { $fetch } from "@/shared/api/fetch"
import { CheckIsNotUser, UserContext } from "@/shared/providers/UserProvider"
import { useRouter } from "next/navigation"
import Input from "@/shared/components/Inputs/Input";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Card1 from "@/shared/components/Sections/Card1";

interface LoginResponse {
    json?: {
        errors?: Record<string, string>
        credentials?: {
            token: string
        }
    }
}

interface LoginErrors {
    email?: string
    password?: string
    [key: string]: string | undefined
}

export default function LoginWidget() {
    const { setToken, setUser } = useContext(UserContext)
    const { _window } = useContext(WindowContext)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [errors, setErrors] = useState<LoginErrors | null>(null)
    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrors(null)

        const formData = new FormData(e.currentTarget)

        const response = await $fetch("auth/login", {
            method: "POST",
            body: formData
        }) as LoginResponse

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        const token_ = response?.json?.credentials?.token

        if (token_ && typeof window !== 'undefined') {
            localStorage.setItem("token", token_)
            setToken(token_)
            router.push("/profile")
        }
    }

    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        setIsActive(e.target.checked)
    }

    return (
        <CheckIsNotUser>
            <Container className="min-h-[calc(100vh-80px)] bg-white px-0 lg:mt-5 lg:flex lg:items-center lg:bg-transparent">
                <Card1>
                    <Heading variant="h4">
                        Вход в профиль
                    </Heading>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[25px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                        <Input label={"Почта"} placeholder={"ivanov@gmail.com"} name={"email"} error={errors?.email} />

                        <Input label={"Пароль"} placeholder={"*******"} name={"password"} error={errors?.password} type={"password"} />

                        <div className="flex justify-between">
                            <div className="flex justify-between items-center gap-[10px] select-none" style={{ fontWeight: 400 }}>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={handleCheckboxChange}
                                    className="w-[15px] h-[15px]"
                                    id="remember-me"
                                />
                                <label htmlFor="remember-me">
                                    Запомнить меня
                                </label>
                            </div>
                            <Link href="/">
                                <PautinaText variant="secondary" color={colorStyles.text.accent.light} style={{ fontWeight: "600" }}>
                                    Вход по коду
                                </PautinaText>
                            </Link>
                        </div>

                        <ButtonLarge text={"Войти"} />

                    </form>

                    <PautinaText variant="secondary" className="mt-[clamp(25px,0.938vw_+_22.000px,40px)]" style={{ fontWeight: 500 }}>
                        Нет аккаунта ? <Link href="/register"><PautinaText component="span" variant="secondary" style={{ fontWeight: 600 }} color={colorStyles.text.accent.light}>Регистрация</PautinaText></Link>
                    </PautinaText>
                </Card1>
            </Container>
        </CheckIsNotUser>
    )
}