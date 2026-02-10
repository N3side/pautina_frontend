import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {$fetch} from "@/shared/api/fetch";

import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {useContext, useEffect} from "react";
import {UserContext} from "@/entities/user";

import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import Timer from "@/features/timer/Timer"

export default function OTP({name, email, otp, setOtp, next, position, timer, setTimer}) {

    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        console.log(timer)
    }, [timer]);

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

        const timer_ = response?.json?.timer

        if (timer_ !== undefined && timer_ !== null) {
            const seconds = Number(timer_)
            if (!Number.isNaN(seconds) && seconds > 0) {
                setTimer(seconds)
            }
        }
    }

    return (
        // <CheckGuest>
            <div>
                <div className="flex flex-col gap-[15px]">
                    <h4 className="text-text-main font-bold">
                        Проверка письма *
                    </h4>
                    <p className="text-secondary text-text-muted">
                        {name}, если не видите письма на {email}, посмотрите пожайлуста папку "Спам". Если письма там нет, запросите код еще раз или напишите в поддержку
                    </p>
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