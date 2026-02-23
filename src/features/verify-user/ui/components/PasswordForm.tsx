import Input from "@/shared/ui/Inputs/Input";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import MonkeyAnimation from "@/shared/ui/Animations/MonkeyAnimation";
import {$fetch} from "@/shared/api/fetch";
import Timer from "@/features/timer/Timer"


interface Props {
    prev: () => void
    next: () => void
    timer: any
    setTimer: Dispatch<SetStateAction<any>>
    skipNext: () => void
}

export default function PasswordForm({next, prev, timer, setTimer, skipNext}: Props) {

    const form_ = useRef(null)

    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form_?.current) {
            return
        }

        setErrors(null)

        const formData = new FormData(form_.current)

        const response = await $fetch("auth/verify/password", {
            method: "POST",
            body: formData
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            console.log(errors_)
            setErrors(errors_)
            return
        }

        if (response?.response?.ok) {
            skipNext()
        }
    }

    const [isOpen, setIsOpen] = useState<boolean>(false)


    async function handleClick() {
        const response = await $fetch("auth/verify/otp/send", {method: "POST"})

        const timer_ = response?.json?.timer

        if (timer_) {
            setTimer(timer_)
        }

        next()
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={form_}>

            <h5 className="font-bold text-text-main">
                Подтвердите, что это ваш аккаунт
            </h5>

            <div className="flex flex-col gap-2 items-center w-full">
                <MonkeyAnimation type={isOpen ? "peek" : "close"} />

                <Input
                    label="Ваш текущий пароль"
                    className="w-full"
                    name="secret"
                    type_="password"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    error={errors?.secret}
                />
            </div>

            <Timer handleClick={handleClick} setTimer={setTimer} timer={timer} message="не помню пароль" />

            <ButtonLarge>
                Дальше
            </ButtonLarge>
        </form>
    )
}





