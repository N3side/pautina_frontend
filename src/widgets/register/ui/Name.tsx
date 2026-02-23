import {useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

export default function Name({name, setName, next}) {

    const [errors, setErrors] = useState<Record<any, string> | null>(null)

    async function handleSubmit(e) {

        setErrors(null)

        e.preventDefault()

        if (!name) {
            setErrors({name: "Пожалуйста, введите ваше имя"})
            return
        }

        next()
    }

    async function handleChange(e) {
        const name_ = e.target.value

        setName(name_)

        safeLocalStorage.setItem("user_name", name_)
    }

    return (
        <div className="w-full">
            {/* Заголовок и подзаголовок */}
            <div className="flex flex-col gap-3 lg:text-left">
                <h4 className="font-bold text-text-main">
                    Добро пожаловать на платформу Паутина
                </h4>
                <p className="text-secondary text-text-muted">
                    Для дальнейшей работы предлагаем познакомиться
                </p>
            </div>

            {/* Форма */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mt-8 lg:mt-10 w-full"
            >

                <Input
                    label={"Введите Ваше имя"}
                    placeholder={"Имя"}
                    error={errors?.name}
                    onChange={handleChange}
                    value={name}
                    defaultValue={safeLocalStorage.getItem("user_name") ?? undefined}
                />

                <ButtonLarge text={"Продолжить"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}