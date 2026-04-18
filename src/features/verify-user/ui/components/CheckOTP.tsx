import Input from "@/shared/ui/Inputs/Input";
import Timer from "@/features/timer/Timer";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import ActionButton from "@/shared/ui/Buttons/ActionButton";

interface Props {
    timer: any
    setTimer: Dispatch<SetStateAction<any>>
    next: () => void
    prev?: () => void
}

export default function CheckOtp({timer, setTimer, next, prev}: Props) {

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const form_ = useRef<HTMLFormElement>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        if (!form_?.current) {
            return
        }

        const formData = new FormData(form_.current)

        const response = await $fetch("auth/verify/otp/check", {method: "POST", body: formData})
        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        if (response?.response?.ok) {
            next()
        }
    }

    async function handleClick() {
        const response = await $fetch("auth/verify/otp/send", {method: "POST"})
        const timer_ = response?.json?.timer
        if (timer_) {
            setTimer(timer_)
        }
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={form_}>

            <h5 className="font-bold text-text-main">
                Подтверждение владения аккаунтом
            </h5>

            <div className="flex flex-col gap-2 items-center w-full">

                <Input
                    label="Код, пришедший вам на почту"
                    className="w-full"
                    name="secret"
                    error={errors?.secret}
                />
            </div>

            <div className="flex flex-col gap-3">
                <ButtonLarge>
                    <p className="text-white text-small font-bold">Подтвердить</p>
                </ButtonLarge>

                <ActionButton onClick={handleClick}>
                    <p className="text-small font-bold" style={{color: timer > 0 ? "var(--text-muted)" : "white"}}>Отправить заново</p>
                    <Timer handleClick={handleClick} setTimer={setTimer} timer={timer} />
                </ActionButton>
            </div>

        </form>
    )
}