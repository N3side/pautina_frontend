import {Heading} from "@/shared/cat/typography/headings";
import {PautinaText} from "@/shared/cat/typography/text";
import {$fetch} from "@/shared/api/fetch";
import toast from "react-hot-toast";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/shared/providers/UserProvider";
import {router} from "next/client";
import {colorStyles} from "@/shared/cat/colors";
import {DeleteRegistrationInfo} from "@/shared/utils/deleteRegistrationInfo";
import {DeleteAuthorizationInfo} from "@/shared/utils/deleteAuthorizationInfo";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export default function OTP({email, next, prev}) {

    const {user, setToken} = useContext(UserContext)

    const [otp, setOtp] = useState<string | number | null>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        const response = await $fetch("auth/otp/verify", {
            method: "POST",
            body: JSON.stringify({OTP: otp, email}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response?.response?.ok) {
            return
        }

        const token = response?.json?.credentials?.token

        if (token) {
            safeLocalStorage.setItem("token", token)
            setToken(token)
            DeleteAuthorizationInfo()
            DeleteRegistrationInfo()
            router.push("profile")
        }

        next()
    }

    async function handleChange(e) {
        const otp_ = e.target.value

        setOtp(otp_)

        if (typeof window !== 'undefined') {
            safeLocalStorage.setItem("email_otp", otp_)
        }

    }

    useEffect(() => {

        if (Boolean(user?.confirmed_email)) {
            next()
        }
    }, [user]);

    const [timer, setTimer] = useState(null)

    async function handleClick() {

        const response = await $fetch("auth/otp/send", {
            method: "POST",
            body: JSON.stringify({email: email}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const timer_ = response?.json?.retry_after_seconds
        if (timer_) setTimer(timer_)
    }

    useEffect(() => {

        if (timer === null) return;

        const id = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);

    }, [timer]);

    useEffect(() => {
        if (!email) {
            prev()
        }
    }, [email])

    return (
        // <CheckUser>
            <div>
                <div className="flex flex-col gap-[15px]">
                    <Heading variant="h4" className="text-text-main font-bold">
                        Проверка одноразового кода
                    </Heading>
                    <PautinaText variant="secondary" className="text-text-muted">
                        Eсли не видите письма на {email}, посмотрите пожайлуста папку "Спам". Если письма там нет, запросите код еще раз или напишите в поддержку
                    </PautinaText>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">

                    <Input label={"Проверочный код *"} placeholder={"Введите код"} name={"OTP"} onChange={handleChange} />

                    <ButtonLarge text={"Далее"}>
                        <></>
                    </ButtonLarge>

                    <div className="flex gap-2 items-center">
                        <div onClick={() => {
                            if (!timer) {
                                handleClick()
                            }
                        }}>
                            <PautinaText
                                variant={"small"}
                                className={`text-${!timer ? "text-main" : "text-muted"} font-${!timer ? "bold" : "medium"} cursor-${!timer ? "pointer" : "inherit"}`}

                            >
                                Отправить код заново
                            </PautinaText>
                        </div>
                        {timer && (
                            <PautinaText variant={"small"} className="font-semibold text-text-main">
                                {timer}
                            </PautinaText>
                        )}
                    </div>

                </form>
            </div>
        // </CheckUser>
    )
}