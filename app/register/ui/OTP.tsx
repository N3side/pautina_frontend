import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";
import {$fetch} from "@/shared/api/fetch";
import toast from "react-hot-toast";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {useContext, useEffect, useState} from "react";
import {CheckGuest, UserContext} from "@/shared/providers/UserProvider";
import {isBoolean} from "node:util";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export default function OTP({name, email, otp, setOtp, next, position}) {

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

    }, [user, position]);

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

                </form>
            </div>
        // </CheckGuest>
    )
}