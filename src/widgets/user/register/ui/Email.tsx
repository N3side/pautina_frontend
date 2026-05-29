import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/entities/user";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";
import {Checkbox} from "@mui/material";
import toast from "react-hot-toast";
import Link from "next/link"
import Typewriter from "typewriter-effect";

interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
}

export default function Email({name, email, setEmail, next, setTimer, position}) {

    const [errors, setErrors] = useState<FormErrors | null>(null)
    const {user, setToken} = useContext(UserContext)

    const [checked, setIsChecked] = useState<boolean>(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {

        setErrors(null)

        if (user?.contacts?.email) {
            next()
            return
        }
        e.preventDefault()

        if (!checked) {
            toast.error("Согласитесь с обработкой персональных данных")
            return
        }

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
            safeCookieStorage.setItem("token", token)
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
                <h4 className="text-text-main font-bold">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(30) // Устанавливаем скорость 20ms
                                .typeString(`Привет, ${name?.charAt(0).toUpperCase() + name?.slice(1,) }, приятно познакомиться`)
                                .start(); // Запускаем один раз и всё
                        }}
                    />

                </h4>
                <p className="text-secondary text-text-muted">
                    Чтобы система запомнила Вас, необходимо ввести свою электронную почту. На эту почту придет код подтверждения
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                <Input
                    label={"Ваша почта *"}
                    placeholder={"Введите ее"}
                    name={"email"}
                    error={errors?.email}
                    onChange={handleChange}
                    defaultValue={safeLocalStorage.getItem("user_email") ?? undefined}
                />

                <div className="flex items-center cursor-pointer gap-2 select-none" onClick={() => setIsChecked(prev => !prev)}>
                    <Checkbox
                        checked={checked}
                        className="!text-text-main !rounded-[4px] !p-0.5"
                    />
                    <p className="text-text-muted font-medium">Согласен с <Link href="https://docs.google.com/document/d/1l0Vqo7sirSn4_dqWWlq-Y58pQ2u9p8EtcsInNhQy5m0/edit?usp=sharing" target="_blank" className="text-text-main" onClick={(e) => e.stopPropagation()}>обработкой персональных данных</Link></p>
                </div>

                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>

            </form>
        </div>
    )
}