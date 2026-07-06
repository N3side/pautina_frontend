"use client"

import React, { useContext, useEffect, useState } from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { UserContext} from "@/entities/user";
import Profile from "@/widgets/user/edit-user-info/ui/parts/Profile";
import Contacts from "@/widgets/user/edit-user-info/ui/parts/Contacts";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import Subscription from "@/widgets/user/edit-user-info/ui/parts/Subscription";
import SettingsWidget from "@/widgets/user/settings/ui/SettingsWidget";
import Chip from "@/shared/ui/Chip/Chip";
import {useHeaderHeight} from "@/shared/lib/hooks/useHeaderHeight";

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
        {
            name: "Настройки",
            children: <SettingsWidget />,
            param: "settings"
        },
        {
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

    const {headerHeight} = useHeaderHeight()

    if (!isClient) {
        return null; // В Next.js лучше возвращать null вместо пустого return
    }

    return (
        <div className="flex justify-between w-full h-fit top-0">
            <div className="flex flex-col-reverse gap-3 w-full lg:flex-row">
                <div className="flex-2">
                    {activeStep && activeStep?.children}
                </div>
                <div className="glass-effect rounded-[18px] p-4 flex-1 h-fit self-start lg:sticky block w-full"
                     style={{
                         top: `${headerHeight + 16}px`,
                     }}
                >
                    <p className="text-text-main font-bold text-secondary pl-2">Редактирование</p>

                    <div className="flex flex-col mt-3 gap-2 h-full min-h-0">
                        {PARTS.map((part, key) => (
                            part &&
                            <Chip
                                isActive={currentStepParam == part?.param}
                                href=""
                                key={key}
                                text={part?.name}
                                className="pr-6 pl-3 py-2"
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