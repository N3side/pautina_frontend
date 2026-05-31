"use client"

import React from 'react';

export default function CardSkeleton() {
    return (
        <div
            className="
                relative h-full
                rounded-2xl overflow-hidden
                shadow-2xl shadow-brand/5
                animate-pulse
            "
        >
            {/* Имитация изображения (высота 160px как в оригинале) */}
            <div className="relative h-[160px] w-full bg-border-default/40" />

            {/* Контент карточки (p-5 как в оригинале) */}
            <div className="flex flex-col gap-3 h-full p-5">

                {/* Мета-данные (Дата и Тип) */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-border-default/40 rounded-full" /> {/* Иконка календаря */}
                        <div className="h-3 w-20 bg-border-default/30 rounded-md" /> {/* Дата */}
                    </div>
                    <div className="h-5 w-16 bg-brand/10 rounded-full" /> {/* Тип документа */}
                </div>

                {/* Заголовок и Организация */}
                <div className="space-y-2">
                    {/* Заголовок в 2 строки */}
                    <div className="space-y-1">
                        <div className="h-5 w-full bg-border-default/60 rounded-md" />
                        <div className="h-5 w-2/3 bg-border-default/60 rounded-md" />
                    </div>

                    {/* Организация */}
                    <div className="flex items-center gap-1">
                        <div className="w-3.5 h-3.5 bg-border-default/30 rounded-sm" />
                        <div className="h-3 w-32 bg-border-default/30 rounded-md" />
                    </div>
                </div>

                {/* Описание (пропускаем или добавляем пару строк) */}
                <div className="space-y-1 mt-1">
                    <div className="h-3 w-full bg-border-default/20 rounded-sm" />
                    <div className="h-3 w-4/5 bg-border-default/20 rounded-sm" />
                </div>

                {/* Теги (имитация ShowTags) */}
                <div className="flex gap-2 mt-1">
                    <div className="h-6 w-12 bg-border-default/20 rounded-md" />
                    <div className="h-6 w-16 bg-border-default/20 rounded-md" />
                    <div className="h-6 w-16 bg-border-default/20 rounded-md" />
                    <div className="h-6 w-16 bg-border-default/20 rounded-md" />
                </div>

                {/* Футер карточки (mt-auto и border-t) */}
                <div className="pt-4 border-t border-border-default/30 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="h-2.5 w-16 bg-border-default/20 rounded-sm" /> {/* "Мероприятие" */}
                        <div className="h-4 w-28 bg-border-default/40 rounded-md" />   {/* Название события */}
                    </div>
                    {/* Кнопка скачивания (квадратная 40x40) */}
                    <div className="w-10 h-10 rounded-xl bg-brand/20" />
                </div>
            </div>
        </div>
    );
}