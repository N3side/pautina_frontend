import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";
import {$fetch} from "@/shared/api/fetch";
import {CheckUser} from "@/shared/providers/UserProvider";
import {useState} from "react";
import toast from "react-hot-toast";

export default function OTP({name, setName, email, otp, setOtp, next}) {

    async function handleSubmit(e) {

        e.preventDefault()

        const response = await $fetch("onboarding/confirm-email", {
            method: "POST",
            body: JSON.stringify({OTP: otp, _method: "PATCH"}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response?.response?.ok) {
            return
        }

        toast.success("Вы подтвердили почту")

        next()
    }

    async function handleChange(e) {
        const otp_ = e.target.value

        setOtp(otp_)
        localStorage.setItem("email_otp", otp_)
    }

    return (
        // <CheckUser>
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
                    <div className="flex flex-col gap-[8px]">
                        <label htmlFor="email">
                            <PautinaText variant="secondary" style={{fontWeight: 700}}>
                                Проверочный код *
                            </PautinaText>
                        </label>
                        <input name="text" defaultValue={otp} onChange={handleChange} placeholder="Введите код" id="" className="w-full px-5 py-[15px] rounded-[6px]" style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}/>
                    </div>

                    <ShadowWrapper>
                        <Button type="submit" style={{ marginTop: "15px", background: colorStyles.buttons.brand.light, padding: "15px 0px", borderRadius: '12px', width: "100%" }}>
                            <PautinaText variant="button2" color={COLORS.white}>
                                Далее
                            </PautinaText>
                        </Button>
                    </ShadowWrapper>

                </form>
            </div>
        // </CheckUser>
    )
}