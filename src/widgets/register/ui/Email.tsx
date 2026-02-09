import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/entities/user";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
}

export default function Email({name, email, setEmail, next, setTimer, position}) {

    const [errors, setErrors] = useState<FormErrors | null>(null)

    const {user, setToken} = useContext(UserContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {

        setErrors(null)

        if (user?.email) {
            next()
            return
        }

        e.preventDefault()

        if (!email) {
            setErrors({email: "Пожалуйста, введите вашу почту"})
            return
        }

        const response = await $fetch("auth/register", {
            method: "POST",
            body: JSON.stringify({email, name}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response_errors = response?.json?.errors

        if (response_errors) {
            setErrors(response_errors)
            return
        }

        const timer_ = response?.json?.timer

        if (timer_) {
            setTimer(timer_)
        }

        const token = response?.json?.credentials?.token

        if (token) {
            safeLocalStorage.setItem("token", token)
            setToken(token)
        }

        next()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const email = e.target.value

        setEmail(email)

        safeLocalStorage.setItem("user_email", email)

    }

    return (
        <div>
            <div className="flex flex-col gap-[15px]">
                <Heading variant="h4">
                    Привет, {name?.charAt(0).toUpperCase() + name?.slice(1,) }, приятно познакомиться
                </Heading>
                <PautinaText variant="secondary">
                    Чтобы система запомнила Вас, необходимо ввести свою электронную почту. На эту почту придет код подтверждения
                </PautinaText>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input
                    label={"Ваша почта *"}
                    placeholder={"Введите ее"}
                    name={"email"}
                    error={errors?.email}
                    onChange={handleChange}
                    defaultValue={safeLocalStorage.getItem("user_email")}
                />

                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>

            </form>
        </div>
    )
}