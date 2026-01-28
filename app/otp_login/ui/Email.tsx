import {Heading} from "@/shared/cat/typography/headings";
import {PautinaText} from "@/shared/cat/typography/text";
import {useContext, useState, FormEvent, ChangeEvent, useEffect} from "react";
import {$fetch} from "@/shared/api/fetch";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import Link from "next/link";
import {UserContext} from "@/shared/providers/UserProvider";

interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
}

export default function Email({email, name, setEmail, next}) {

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

        next()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const email = e.target.value

        setEmail(email)

        if (typeof window !== 'undefined') {
            localStorage.setItem("login_email", email)
        }

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

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