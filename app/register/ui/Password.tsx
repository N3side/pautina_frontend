import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {FormEvent, RefObject, useRef, useState} from "react";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {$fetch} from "@/shared/api/fetch";
import {redirect} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/utils/deleteAuthorizationInfo";

export default function Password() {

    const [errors, setErrors] = useState(null)

    const form = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();
        setErrors(null);

        // Use currentTarget to get the form and create FormData immediately
        const formData = new FormData(e.currentTarget);

        const password = formData.get('password') as string;
        const password_repeat = formData.get('password_repeat') as string;

        if (!password) {
            setErrors({
                "password": "Пожалуйста, придумайте пароль.",
                "password_repeat": "Пожалуйста, повторите пароль.",
            });
            return;
        }

        if (password_repeat !== password) {
            setErrors({
                "password": "Пароли должны совпадать",
                "password_repeat": "Пароли должны совпадать",
            });
            return;
        }

        const response = await $fetch("onboarding/password", {
            method: "PATCH",
            body: formData
        });

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        DeleteRegistrationInfo()
        DeleteAuthorizationInfo()

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
            <form onSubmit={handleSubmit} ref={form} className="flex flex-col gap-[25px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input label={"Пароль *"} placeholder={"*******"} name={"password"} type={"password"} error={errors?.password} />
                <Input label={"Подтвердите пароль *"} placeholder={"*******"} name={"password_repeat"} type={"password"} error={errors?.password_repeat} />

                <ButtonLarge text={"Перейти в профиль"}>
                    <></>
                </ButtonLarge>

            </form>
        </div>
    )
}