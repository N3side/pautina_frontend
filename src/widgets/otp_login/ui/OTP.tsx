import {$fetch} from "@/shared/api/fetch";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user/model/UserContext";
import {router} from "next/client";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

import Timer from "@/features/timer/Timer"
import {userLink} from "@/shared/lib/userLink";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";

export default function OTP({email, next, prev, timer, setTimer}) {

    const {user, setToken} = useContext(UserContext)

    const [otp, setOtp] = useState<string | number | null>(null)


    async function handleSubmit(e) {

        e.preventDefault()

        const response = await $fetch("auth/otp/verify", {
            method: "POST",
            body: JSON.stringify({OTP: otp, email}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response?.response?.ok) {
            return
        }

        const token = response?.json?.credentials?.token

        if (token) {
            safeCookieStorage.setItem("token", token)
            setToken(token)
            DeleteAuthorizationInfo()
            DeleteRegistrationInfo()
            router.push(userLink(user?.id))
        }

        const timer_ = response?.json?.timer

        console.log(timer_)

        if (timer_) setTimer(timer_)

        next()
    }

    async function handleChange(e) {
        const otp_ = e.target.value

        setOtp(otp_)

        safeLocalStorage.setItem("email_otp", otp_)
    }

    useEffect(() => {

        if (Boolean(user?.confirmed_email)) {
            next()
        }
    }, [user]);

    async function handleClick() {

        const response = await $fetch("auth/otp/send", {
            method: "POST",
            body: JSON.stringify({email: email}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const timer_ = response?.json?.timer
        if (timer_) setTimer(timer_)
    }

    useEffect(() => {
        if (!email) {
            prev()
        }
    }, [email])

    return (
        // <CheckUser>
        <div>
            <div className="flex flex-col gap-[15px]">
                <h4 className="text-text-main font-bold">
                    Проверка одноразового кода
                </h4>
                <p className="text-secondary text-text-muted">
                    Eсли не видите письма на {email}, посмотрите пожайлуста папку "Спам". Если письма там нет, запросите
                    код еще раз или напишите в поддержку
                </p>
            </div>
            <form onSubmit={handleSubmit}
                  className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input label={"Проверочный код *"} placeholder={"Введите код"} name={"OTP"} onChange={handleChange}/>

                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>

                <Timer
                    handleClick={handleClick}
                    timer={timer}
                    setTimer={setTimer}
                    message="Отправить код заново"
                />

            </form>
        </div>
        // </CheckUser>
    )
}