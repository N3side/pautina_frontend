import {Heading} from "@/shared/cat/typography/headings";
import {PautinaText} from "@/shared/cat/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/cat/colors";
import {FormEvent, RefObject, useRef, useState} from "react";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {$fetch} from "@/shared/api/fetch";
import {redirect} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/utils/deleteRegistrationInfo";

export default function Password() {

    const [errors, setErrors] = useState(null)

    const form = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        setErrors(null)

        e.preventDefault()

        const formData = new FormData(form.current)

        const response = await $fetch("onboarding/password", {
            method: "PATCH",
            body: formData
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        DeleteRegistrationInfo()

        redirect("/profile")


        e.preventDefault()
    }

    return (
        <div className="">
            <div className="flex flex-col gap-[15px] w-full">
                <Heading variant="h4">
                    Пароль
                </Heading>

                <PautinaText variant="secondary">
                    И завершающий штрих - безопасность. Придумайте пароль для входа в личный кабинет
                </PautinaText>
            </div>
            <form onSubmit={handleSubmit} ref={form} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input label={"Пароль *"} placeholder={"*******"} name={"password"} type={"password"} error={errors?.password} />

                <ButtonLarge text={"Перейти в профиль"} />

            </form>
        </div>
    )
}