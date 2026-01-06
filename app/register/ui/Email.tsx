import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";
import {useContext, useState, FormEvent, ChangeEvent} from "react";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/shared/providers/UserProvider";

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

    const {setToken} = useContext(UserContext)

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {

        setErrors(null)

        e.preventDefault()

        if (!email) {
            setErrors({email: "Пожалуйста, введите ваше имя"})
            return
        }

        const response = await $fetch("auth/register", {
            method: "POST",
            body: JSON.stringify({email, name}),
            headers: {
                "Content-Type": "application/json"
            }
        }) as RegisterResponse

        console.log(JSON.stringify({email, name}))

        const response_errors = response?.json?.errors

        if (response_errors) {
            console.log(1111)
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
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="email">
                        <PautinaText variant="secondary" style={{fontWeight: 700}}>
                            Ваша почта *
                        </PautinaText>
                    </label>
                    <input
                        name="text"
                        onChange={handleChange}
                        defaultValue={email}
                        placeholder="Введите ее"
                        id="email"
                        className="w-full px-5 py-[15px] rounded-[6px]"
                        style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}
                    />
                    {errors?.email}
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
    )
}