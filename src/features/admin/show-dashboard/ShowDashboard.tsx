"use client"

import { $fetch } from "@/shared/api/fetch";
import { useEffect, useState } from "react";

// Импортируем иконки (используем Material-UI, так как вы использовали их ранее)
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import StatCard from "@/shared/ui/StatCard/StatCard";
import ChartCard from "@/shared/ui/ChartCard/ChartCard";

export default function ShowDashboard() {
    const [info, setInfo] = useState<Record<string, any> | null>(null);

    async function getDashboard() {
        const response = await $fetch("admin/dashboard");
        setInfo(response?.json);
    }

    useEffect(() => {
        getDashboard();
    }, []);

    const emailData = [
        { name: 'Подтвержденные', value: info?.confirmed_count || 0, color: '#0ea5e9' }, // Голубой
        { name: 'Гости', value: info?.guest_count || 0, color: '#64748b' },             // Серый
    ];

    const subData = [
        { name: 'С подпиской', value: info?.users_with_sub || 0, color: '#10b981' },     // Изумрудный (зеленый)
        { name: 'Без подписки', value: info?.users_without_sub || 0, color: '#64748b' }, // Серый
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full">
            {/* Заголовок страницы */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">Статистика</h1>
            </div>

            <div className="flex flex-col gap-6">
                {/* Секция 1: Главные цифры (Карточки) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Пользователи"
                        count={info?.users_count}
                        icon={PeopleAltOutlinedIcon}
                        colorClass="text-sky-500 bg-sky-500"
                    />
                    <StatCard
                        title="Проекты"
                        count={info?.projects_count}
                        icon={FolderOpenOutlinedIcon}
                        colorClass="text-emerald-500 bg-emerald-500"
                    />
                    <StatCard
                        title="Документы"
                        count={info?.documents_count}
                        icon={DescriptionOutlinedIcon}
                        colorClass="text-indigo-500 bg-indigo-500"
                    />
                </div>

                {/* Секция 2: Графики */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartCard
                        title="Подтвержденные пользователи"
                        data={emailData}
                    />
                    <ChartCard
                        title="Наличие подписки"
                        data={subData}
                    />
                </div>
            </div>
        </div>
    )
}