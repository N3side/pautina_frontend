import {FormEvent, useContext, useRef, useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {$fetch} from "@/shared/api/fetch";
import {redirect} from "next/navigation";
import {DeleteRegistrationInfo} from "@/shared/lib/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/lib/utils/deleteAuthorizationInfo";
import {UserContext} from "@/entities/user";
import {userLink} from "@/shared/lib/userLink";
import MonkeyAnimation from "@/shared/ui/Animations/MonkeyAnimation";

export default function Password() {

    const [errors, setErrors] = useState<Record<any, string> | null>(null)

    const form = useRef<HTMLFormElement>(null)

    const {user} = useContext(UserContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();
        setErrors(null);

        // Use currentTarget to get the form and create FormData immediately
        const formData = new FormData(e.currentTarget);

        const password = formData.get('password') as string;
        const password_repeat = formData.get('password_repeat') as string;

        if (!password) {
            setErrors({
                password: "Пожалуйста, придумайте пароль.",
                "password_repeat": "Пожалуйста, повторите пароль.",
            });
            return;
        }

        if (password_repeat !== password) {
            setErrors({
                password: "Пароли должны совпадать",
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

        redirect(userLink(user?.main?.public_url))

        e.preventDefault()
    }

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="">

            <div className="flex flex-col gap-[15px] w-full">
                <h4 className="text-text-main font-bold">
                    Пароль
                </h4>

                {/*<p className="text-secondary text-text-muted">*/}
                {/*    И завершающий штрих - безопасность. Придумайте пароль для входа в личный кабинет*/}
                {/*</p>*/}
            </div>

            <div className="flex w-full">
                <MonkeyAnimation type={isOpen ? "peek" : "close"} />
            </div>

            <form onSubmit={handleSubmit} ref={form} className="flex flex-col gap-[25px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input
                    label={"Пароль *"}
                    placeholder={"*******"}
                    name={"password"}
                    type_="password"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    error={errors?.password}
                />
                <Input label={"Подтвердите пароль *"} placeholder={"*******"} name={"password_repeat"} type={"password"} error={errors?.password_repeat} />

                <ButtonLarge text={"Перейти в профиль"}>
                    <></>
                </ButtonLarge>

            </form>
        </div>
    )
}