"use client"

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { UserContext } from "@/entities/user";
import Elem from "@/widgets/user/sidebar/ui/Elem";
import Profile from "@/widgets/user/edit-user-info/ui/parts/Profile";
import Contacts from "@/widgets/user/edit-user-info/ui/parts/Contacts";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import Subscription from "@/widgets/user/edit-user-info/ui/parts/Subscription";

// Выносим массив за пределы компонента, чтобы он не пересоздавался при каждом рендере

export default function EditUserInfo() {
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {user} = useContext(UserContext)

    const PARTS = [
        {
            name: "Профиль",
            children: <Profile heading="Редактировать профиль" />,
            param: "profile" // Переименовали в param для удобства
        },
        {
            name: "Контакты",
            children: <Contacts heading="Контакты" />,
            param: "contacts"
        },
        HasUserSubscription({user}) && {
            name: "Управление подпиской",
            children: <Subscription heading="Подписка" />,
            param: "subscription"
        },
    ];

    // 1. Получаем текущий шаг из URI (?step=...)
    const currentStepParam = searchParams.get("step");

    // 2. Ищем индекс шага в массиве. Если параметра нет или он невалидный — по умолчанию ставим 0 (первый шаг)
    const currentStepIndex = PARTS.findIndex(part => part && part?.param === currentStepParam);
    const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

    // Текущий активный компонент
    const activeStep = PARTS[activeIndex];

    // 3. Функция для смены шага через URL
    const handleStepChange = (param: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", param);

        // Обновляем URL без перезагрузки страницы
        router.push(`${pathname}?${params.toString()}`);
    };

    if (!isClient) {
        return null; // В Next.js лучше возвращать null вместо пустого return
    }

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-col-reverse gap-3 w-full lg:flex-row">
                <div className="flex-2">
                    {activeStep && activeStep?.children}
                </div>
                <div className="glass-effect rounded-[18px] p-4 flex-1">
                    <p className="text-text-main font-bold text-secondary">Редактирование</p>

                    <div className="flex flex-col mt-6 gap-0.5 lg:min-h-[50vh] h-full min-h-0">
                        {PARTS.map((part, key) => (
                            part &&
                            <Elem
                                href=""
                                key={key}
                                text={part?.name}
                                // Передаем активный класс, если элемент совпадает с текущим шагом
                                className={key === activeIndex ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault(); // Предотвращаем переход по пустой ссылке href=""
                                    handleStepChange(part?.param);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}