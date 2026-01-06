import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";
import {useContext, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/shared/providers/UserProvider";

export default function Email({name, email, setEmail, next}) {

    const [errors, setErrors] = useState(null)

    const {setToken} = useContext(UserContext)

    async function handleSubmit(e) {

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
        })

        console.log(JSON.stringify({email, name}))

        const response_errors = response?.json?.errors

        if (response_errors) {
            console.log(1111)
            setErrors(response_errors)
            return
        }

        const token = response?.json?.credentials?.token

        if (token) {
            localStorage.setItem("token", token)
            setToken(token)
        }

        next()
    }

    async function handleChange(e) {
        const email = e.target.value

        setEmail(email)
        localStorage.setItem("user_email", email)
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
                    <input name="text" onChange={handleChange} defaultValue={email} placeholder="Введите ее" id="" className="w-full px-5 py-[15px] rounded-[6px]" style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}/>
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