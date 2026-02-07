import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {$fetch} from "@/shared/api/fetch";

import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {useContext, useEffect, useState} from "react";
import {CheckGuest, UserContext} from "@/shared/providers/UserProvider";

import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";
import Timer from "@/shared/components/Timer"

export default function OTP({name, email, otp, setOtp, next, position, timer, setTimer}) {

    const {user, setUser} = useContext(UserContext)

    async function handleSubmit(e) {

        e.preventDefault()

        const response = await $fetch("onboarding/confirm-email", {
            method: "POST",
            body: JSON.stringify({email, OTP: otp, _method: "PATCH"}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response?.response?.ok) {
            return
        }

        const user_ = response?.json?.user

        if (user_) {
            setUser(user_)
        }

        next()

        return
    }

    async function handleChange(e) {
        const otp_ = e.target.value

        setOtp(otp_)

        safeLocalStorage.setItem("email_otp", otp_)

    }

    useEffect(() => {

        if (user?.confirmed_email) {
            next()
        }

    }, [position]);



    async function handleClick() {
        const response = await $fetch("onboarding/send", {
            method: "POST",
            body: JSON.stringify({email}),
            headers: {
                "Content-type": "application/json"
            }
        })

        const timer = response?.json?.timer

        if (timer) {
            setTimer(timer)
        }
    }

    return (
        // <CheckGuest>
            <div>
                <div className="flex flex-col gap-[15px]">
                    <Heading variant="h4">
                        Проверка письма *
                    </Heading>
                    <PautinaText variant="secondary">
                        {name}, если не видите письма на {email}, посмотрите пожайлуста папку "Спам". Если письма там нет, запросите код еще раз или напишите в поддержку
                    </PautinaText>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                    <Input label={"Проверочный код *"} placeholder={"Введите код"} name={"text"} onChange={handleChange} />

                    <ButtonLarge text={"Далее"}>
                        <></>
                    </ButtonLarge>

                    <Timer handleClick={handleClick} timer={timer} setTimer={setTimer} message={"Отправить код заново"} />

                </form>
            </div>
        // </CheckGuest>
    )
}