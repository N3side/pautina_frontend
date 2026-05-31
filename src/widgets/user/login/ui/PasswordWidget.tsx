"use client"

import Link from "next/link"
import {FormEvent, useContext, useEffect, useState} from "react"
import {$fetch} from "@/shared/api/fetch"
import {useRouter} from "next/navigation"
import {CheckIsNotUser, UserContext} from "../../../../entities/user-entity";
import Input from "@/shared/ui/Inputs/Input";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Card1 from "@/shared/ui/Sections/Card1";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {userLink} from "@/shared/lib/utils/userLink";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";
import MonkeyAnimation from "@/shared/ui/Animations/MonkeyAnimation";
import ActionButton from "@/shared/ui/Buttons/ActionButton";


interface LoginErrors {
    email?: string
    password?: string
    [key: string]: string | undefined
}

export default function PasswordWidget() {
    const { setToken } = useContext(UserContext)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [errors, setErrors] = useState<LoginErrors | null>(null)
    const router = useRouter()
    const {user} = useContext(UserContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrors(null)

        const formData = new FormData(e.currentTarget)

        const response = await $fetch("auth/login", {
            method: "POST",
            body: formData
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        if (!response?.response?.ok) {
            return
        }

        const token_ = response?.json?.credentials?.token

        DeleteRegistrationInfo()
        DeleteAuthorizationInfo()
        safeCookieStorage.setItem("token", token_)
        setToken(token_)
    }

    useEffect(() => {
        if (user?.publication?.public_url) {
            router.push(userLink(user?.publication?.public_url))
        }
    }, [user]);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <CheckIsNotUser>
            <Card1>
                <h4 className="font-bold text-text-main">
                    Вход по паролю
                </h4>

                {/*<MonkeyAnimation type={isOpen ? "peek" : "close"} width={120} height={120} />*/}


                <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] mt-[20px] w-full">

                    <Input
                        label={"Почта"}
                        placeholder={"ivanov@gmail.com"}
                        name={"email"}
                        error={errors?.email}
                    />

                    <Input
                        label={"Пароль"}
                        type_="password"
                        name={"password"}
                        error={errors?.password}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />

                    <Link href="/otp" className="w-full text-white font-bold text-small">
                        Вход по коду
                    </Link>

                    <ButtonLarge text="Войти" className="!text-[white]">
                        <></>
                    </ButtonLarge>

                </form>

                <Link href="/register" className="w-full mt-3">
                    <ActionButton text="Регистрация" className="w-full" />
                </Link>


            </Card1>
        </CheckIsNotUser>
    )
}