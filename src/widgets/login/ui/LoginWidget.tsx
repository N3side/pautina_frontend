"use client"

import Link from "next/link"
import {FormEvent, useContext, useState} from "react"
import {$fetch} from "@/shared/api/fetch"
import {useRouter} from "next/navigation"
import {UserContext} from "@/entities/user";
import Input from "@/shared/ui/Inputs/Input";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Card1 from "@/shared/ui/Sections/Card1";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {userLink} from "@/shared/lib/userLink";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";


interface LoginErrors {
    email?: string
    password?: string
    [key: string]: string | undefined
}

export default function LoginWidget() {
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
        router.push(userLink(user?.public_url))
    }

    // function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    //     setIsActive(e.target.checked)
    // }

    return (
        // <CheckIsNotUser>
            <Card1>
                <h4 className="font-bold text-text-main">
                    Вход в профиль
                </h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] mt-[20px] w-full ">

                    <Input label={"Почта"} placeholder={"ivanov@gmail.com"} name={"email"} error={errors?.email} />

                    <Input label={"Пароль"} placeholder={"*******"} name={"password"} error={errors?.password} type={"password"} />

                    <div className="flex justify-between">
                        <div className="flex justify-between items-center select-none font-regular">

                            <p className="text-small text-text-main">
                                Или
                            </p>

                            {/*<Checkbox*/}
                            {/*    checked={isActive}*/}
                            {/*    onChange={handleCheckboxChange}*/}
                            {/*    id="remember-me"*/}
                            {/*    sx={{*/}
                            {/*        color: 'var(--color-text-muted)', // unchecked*/}
                            {/*        '&.Mui-checked': {*/}
                            {/*            color: 'text-brand', // checked*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*/>*/}

                            {/*<label htmlFor="remember-me" className="text-text-muted">*/}
                            {/*    Запомнить меня*/}
                            {/*</label>*/}
                        </div>
                        <Link href="/otp_login" className="flex items-center">
                            <p className="text-small text-text-main font-medium">
                                Вход по коду
                            </p>
                        </Link>
                    </div>

                    <ButtonLarge text="Войти" className="!text-[white]">
                        <></>
                    </ButtonLarge>

                </form>

                <p className="text-small mt-[10px] text-text-muted">
                    Нет аккаунта ? <Link href="/register"><span className="text-small text-text-main font-medium">Регистрация</span></Link>
                </p>
            </Card1>
        // </CheckIsNotUser>
    )
}