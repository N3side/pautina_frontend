import {Heading} from "@/shared/cat/typography/headings";
import {PautinaText} from "@/shared/cat/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/cat/colors";
import {useContext, useState, FormEvent, ChangeEvent, useEffect} from "react";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/shared/providers/UserProvider";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";

interface EmailProps {
    name: string;
    email: string;
    setEmail: (email: string) => void;
    next: () => void;
}

interface RegisterResponse {
    json?: {
        errors?: {
            email?: string;
            [key: string]: string;
        };
        credentials?: {
            token: string;
        };
    };
}

interface FormErrors {
    email?: string;
    [key: string]: string | undefined;
}

export default function Email({name, email, setEmail, next}: EmailProps) {

    const [errors, setErrors] = useState<FormErrors | null>(null)

    const {user, setToken} = useContext(UserContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {

        setErrors(null)

        console.log(user)

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
        }) as RegisterResponse

        const response_errors = response?.json?.errors

        if (response_errors) {
            setErrors(response_errors)
            return
        }

        const token = response?.json?.credentials?.token

        if (typeof window !== 'undefined' && token) {
            localStorage.setItem("token", token)
            setToken(token)
        }

        next()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const email = e.target.value

        setEmail(email)

        if (typeof window !== 'undefined') {
            localStorage.setItem("user_email", email)
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
                    defaultValue={localStorage.getItem("user_email")}
                />


                <ButtonLarge text={"Далее"} />

            </form>
        </div>
    )
}