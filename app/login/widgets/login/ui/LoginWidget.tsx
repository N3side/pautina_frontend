"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/styles/colors"
import { Heading } from "@/shared/styles/typography/headings"
import { PautinaText } from "@/shared/styles/typography/text"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import { Button } from "@mui/material"
import Link from "next/link"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useState, FormEvent, ChangeEvent } from "react"
import { $fetch } from "@/shared/api/fetch"
import { CheckIsNotUser, UserContext } from "@/shared/providers/UserProvider"
import { useRouter } from "next/navigation"

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
            setUser(null)
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
            <Container className={`min-h-[calc(100vh_-_80px)]
            ${_window?.innerWidth && _window?.innerWidth < 1024 ? "px-[0px]" : "mt-[20px] flex items-center"}`}>
                <section
                    className={`flex items-center flex-col w-full mx-auto my-0
                    px-[clamp(20px,1.250vw_+_16.000px,40px)] bg-white m-[auto 0]
                    ${_window?.innerWidth && _window?.innerWidth < 1024 ? "w-full h-[calc(100vh_-_80px)] px-[0px] bg-[red] py-[20px]" : "py-[50px] rounded-[24px] max-w-[580px] max-h-[875px]"}`}

                    style={_window?.innerWidth && _window?.innerWidth >= 1024 ? {
                        border: `1px solid ${COLORS.gray[2]}`,
                        boxShadow: `0px 1px 16px rgba(0,0,0,.08)`,
                    } : {}}>
                    <Heading variant="h4">
                        Вход в профиль
                    </Heading>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[25px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">
                        <div className="flex flex-col gap-[8px]">
                            <label htmlFor="email">
                                <PautinaText variant="secondary" style={{ fontWeight: 700 }}>
                                    Почта
                                </PautinaText>
                            </label>
                            <input
                                name="email"
                                defaultValue=""
                                id="email"
                                placeholder="ivanov@gmail.com"
                                className="w-full px-5 py-[15px] rounded-[6px]"
                                style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}
                            />
                            {errors?.email}
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <PautinaText variant="secondary" style={{ fontWeight: 700 }}>
                                Пароль
                            </PautinaText>
                            <input
                                name="password"
                                defaultValue=""
                                type="password"
                                id="password"
                                placeholder="******"
                                className="w-full px-5 py-[15px] rounded-[6px]"
                                style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}
                            />
                            {errors?.password}
                        </div>

                        <div className="flex justify-between">
                            <div className="flex justify-between items-center gap-[10px] select-none" style={{ fontWeight: 400 }}>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={handleCheckboxChange}
                                    className="w-[15px] h-[15px]"
                                />
                                Запомнить меня
                            </div>
                            <Link href="/">
                                <PautinaText variant="secondary" color={colorStyles.text.accent.light} style={{ fontWeight: "600" }}>
                                    Вход по коду
                                </PautinaText>
                            </Link>
                        </div>

                        <ShadowWrapper>
                            <Button
                                type="submit"
                                style={{
                                    marginTop: "15px",
                                    background: colorStyles.buttons.brand.light,
                                    padding: "15px 0px",
                                    borderRadius: '12px',
                                    width: "100%"
                                }}
                            >
                                <PautinaText variant="button2" color={COLORS.white}>
                                    Войти
                                </PautinaText>
                            </Button>
                        </ShadowWrapper>

                    </form>

                    <PautinaText variant="secondary" className="mt-[clamp(25px,0.938vw_+_22.000px,40px)]" style={{ fontWeight: 500 }}>
                        Нет аккаунта ? <Link href="/register"><PautinaText component="span" variant="secondary" style={{ fontWeight: 600 }} color={colorStyles.text.accent.light}>Регистрация</PautinaText></Link>
                    </PautinaText>

                </section>
            </Container>
        </CheckIsNotUser>
    )
}