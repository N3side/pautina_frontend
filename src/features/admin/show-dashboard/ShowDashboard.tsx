"use client"

import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function ConfirmedEmailStats({ info }: { info: any }) {
    // Подготавливаем данные для графика
    const data = [
        { name: 'Подтвержденные', value: info?.confirmed_count || 0, color: '#16a34a' }, // зеленый
        { name: 'Гости', value: info?.guest_count || 0, color: '#64748b' },             // серый
    ];

    return (
        <div className="h-[300px] w-[300px]">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

function SubscritptionStats({ info }: { info: any }) {
    // Подготавливаем данные для графика
    const data = [
        { name: 'С подпиской', value: info?.users_with_sub || 0, color: '#16a34a' }, // зеленый
        { name: 'Без подписки', value: info?.users_without_sub || 0, color: '#64748b' },             // серый
    ];

    return (
        <div className="h-[300px] w-[300px]">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function ShowDashboard() {

    const [info, setInfo] = useState<Record<string, any> | null>(null)

    async function getDashboard() {
        const response = await $fetch("admin/dashboard")

        const info_ = response?.json
        console.log(info_)
        setInfo(info_)
    }

    useEffect(() => {
        getDashboard()
    }, []);

    return (
        <div>
            <div className="glass-effect flex flex-col gap-3 p-4 rounded-[18px]">
                <h6 className="text-text-main font-bold">Всего пользователей: {info?.users_count}</h6>
                <div className="flex gap-4">
                    <ConfirmedEmailStats info={info} />
                    <SubscritptionStats info={info} />
                </div>
            </div>


        </div>
    )
}