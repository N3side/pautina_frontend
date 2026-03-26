import MonkeyAnimation from "@/shared/ui/Animations/MonkeyAnimation";
import Input from "@/shared/ui/Inputs/Input";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import React, {useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import PasswordRequirements from "@/entities/password-requirements/PasswordRequirements";

export default function NewPassword() {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const form_ = useRef<HTMLFormElement>(null)
    const [password, setPassword] = useState<string>("")

    async function handleSubmit(e) {

        e.preventDefault()

        if (!form_?.current) {
            return
        }

        const formData = new FormData(form_.current)

        const response = await $fetch("settings/password", {method: "POST", body: formData})

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
        }

        if (response?.response?.ok) {

        }
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={form_}>

            <h5 className="font-bold text-text-main">
                Новый пароль
            </h5>

            <div className="flex flex-col gap-2 items-center w-full">
                <MonkeyAnimation type={isOpen ? "peek" : "close"} />

                <PasswordRequirements password={password} />

                <Input
                    label="Новый пароль"
                    className="w-full"
                    name="password"
                    type_="password"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    error={errors?.secret}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <ButtonLarge>
                Дальше
            </ButtonLarge>
        </form>
    )
}