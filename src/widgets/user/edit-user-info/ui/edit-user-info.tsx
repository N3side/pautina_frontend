"use client"

import React, {useEffect, useState} from "react";
import Profile from "@/widgets/user/edit-user-info/ui/parts/Profile";
import Contacts from "@/widgets/user/edit-user-info/ui/parts/Contacts";
import Subscription from "@/widgets/user/edit-user-info/ui/parts/Subscription";
import SettingsWidget from "@/widgets/user/settings/ui/SettingsWidget";
import {useStepNavigation} from "@/shared/lib/hooks/useStepNavigation";
import PartsSwitcher from "@/entities/parts-switcher/PartsSwitcher"; // Импортируем хук

export default function EditUserInfo() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const PARTS = [
        {
            name: "Профиль",
            param: "profile",
            children: <Profile heading="Редактировать профиль" />,
        },
        {
            name: "Контакты",
            param: "contacts",
            children: <Contacts heading="Контакты" />,
        },
        {
            name: "Настройки",
            param: "settings",
            children: <SettingsWidget />,
        },
        {
            name: "Управление подпиской",
            param: "subscription",
            children: <Subscription heading="Подписка" />,
        },
    ];

    const { activeStep, handleStepChange, currentStepParam } = useStepNavigation(PARTS);

    return (
        <div className="flex justify-between w-full h-fit top-0">
            <div className="flex flex-col-reverse gap-3 w-full lg:flex-row">
                <div className="flex-2">
                    {/* Рендерим активный шаг */}
                    {activeStep?.children}
                </div>

                <PartsSwitcher
                    PARTS={PARTS}
                    handleStepChange={handleStepChange}
                    currentStepParam={currentStepParam}
                />

            </div>
        </div>
    );
}