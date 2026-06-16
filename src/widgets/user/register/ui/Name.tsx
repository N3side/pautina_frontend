import {useContext, useEffect, useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import Typewriter from 'typewriter-effect';
import {UserContext} from "@/entities/user";

export default function Name({name, setName, next, position}) {

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

    const {user} = useContext(UserContext)

    useEffect(() => {
        if (user?.main?.email && position == 0) {
            next()
        }
    }, [user]);

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
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(30) // Устанавливаем скорость 20ms
                                .typeString('Добро пожаловать на плафторму Паутина')
                                .start(); // Запускаем один раз и всё
                        }}
                    />
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
                    name="name"
                    defaultValue={safeLocalStorage.getItem("user_name") ?? undefined}
                />

                <ButtonLarge text={"Продолжить"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}