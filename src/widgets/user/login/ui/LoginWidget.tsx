"use client"

import Link from "next/link"
import {CheckIsNotUser} from "@/entities/user";
import Card1 from "@/shared/ui/Sections/Card1";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Typewriter from "typewriter-effect";

export default function LoginWidget() {

    return (
        <CheckIsNotUser>
            <Card1>

                <h4 className="font-bold text-text-main">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(20) // Устанавливаем скорость 20ms
                                .typeString('Вход в аккаунт')
                                .start(); // Запускаем один раз и всё
                        }}
                    />
                </h4>

                <div className="mt-6 w-full flex flex-col gap-2">
                    <div className="flex justify-between w-full gap-4">
                        <Link href="/password" className="w-full mt-3">
                            <ActionButton text="Вход по паролю" className="w-full" />
                        </Link>

                        <Link href="/otp" className="w-full mt-3">
                            <ActionButton text="Вход по коду" className="w-full" />
                        </Link>
                    </div>

                    <Link href="/register" className="w-full">
                        <ButtonLarge className="!text-white !font-bold !text-large">
                            Регистрация
                        </ButtonLarge>
                    </Link>
                </div>

            </Card1>
        </CheckIsNotUser>
    )
}