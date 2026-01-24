import {Heading} from "@/shared/cat/typography/headings";
import {PautinaText} from "@/shared/cat/typography/text";
import {useState} from "react";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";

export default function Name({name, setName, next}) {

    const [errors, setErrors] = useState(null)

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

        if (typeof window !== 'undefined') {
            localStorage.setItem("user_name", name_)
        }

    }

    return (
        <div className="w-full">
            {/* Заголовок и подзаголовок */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
                <Heading variant="h4" className="leading-tight">
                    Добро пожаловать на платформу Паутина
                </Heading>
                <PautinaText variant="secondary" className="opacity-80">
                    Для дальнейшей работы предлагаем познакомиться
                </PautinaText>
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
                    defaultValue={localStorage.getItem("user_name")}
                />

                <ButtonLarge text={"Продолжить"} />
            </form>
        </div>
    );
}