import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {UserContext} from "@/entities/user";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
}

export default function Email({email,  setEmail, next, setTimer, timer}) {

    const [errors, setErrors] = useState<FormErrors | null>(null)

    const {user} = useContext(UserContext)

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

        const response = await $fetch("auth/otp/send", {
            method: "POST",
            body: JSON.stringify({email}),
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

        if (timer_) setTimer(timer_)

        next()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const email = e.target.value

        setEmail(email)

        safeLocalStorage.setItem("login_email", email)

    }

    useEffect(() => {
        if (user?.email) {
            next()
        }
    }, [user]);

    return (
        <div>
            <div className="flex flex-col gap-[15px]">
                <Heading variant="h4" className="font-bold text-text-main">
                    Введите почту
                </Heading>
                <PautinaText variant="secondary" className="text-text-muted">
                     Введите почту, к которой привязан ваш аккаунт. На нее будет отправлен одноразовый код
                </PautinaText>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[20px] w-full ">

                <Input
                    label={"Ваша почта *"}
                    placeholder={"Введите ее"}
                    name={"email"}
                    error={errors?.email}
                    onChange={handleChange}
                    defaultValue={email}
                />

                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>

            </form>
        </div>
    )
}