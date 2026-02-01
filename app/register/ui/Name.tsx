import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {useState} from "react";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

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

        safeLocalStorage.setItem("user_name", name_)
    }

    return (
        <div className="w-full">
            {/* Заголовок и подзаголовок */}
            <div className="flex flex-col gap-3 lg:text-left">
                <Heading variant="h4">
                    Добро пожаловать на платформу Паутина
                </Heading>
                <PautinaText variant="secondary">
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
                    defaultValue={safeLocalStorage.getItem("user_name")}
                />

                <ButtonLarge text={"Продолжить"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}