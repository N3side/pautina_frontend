"use client"

import React from 'react';

export default function CardSkeleton() {
    return (
        <div
            className="
                relative flex flex-col h-full
                rounded-2xl overflow-hidden
                border border-border-default/30
                glass-effect
                shadow-2xl shadow-brand/5
                animate-pulse
            "
        >
            {/* Имитация изображения */}
            <div className="relative max-h-[300px] aspect-[16/10] w-full" />

            {/* Контент */}
            <div className="flex flex-col flex-grow p-5 gap-3">

                {/* Мета-данные (Дата и Тип) */}
                <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-border-default/40 rounded-md" />
                    <div className="h-5 w-16 bg-brand/10 rounded-full" />
                </div>

                {/* Заголовок и Организация */}
                <div className="space-y-2">
                    <div className="h-6 w-full bg-border-default/60 rounded-md" />

                    <div className="flex items-center gap-1 mt-2">
                        <div className="w-3.5 h-3.5 bg-border-default/40 rounded-full" />
                        <div className="h-3 w-32 bg-border-default/40 rounded-md" />
                    </div>
                </div>

                {/* Футер */}
                <div className="pt-4 mt-auto border-t border-border-default/30 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-2.5 w-16 bg-border-default/20 rounded-sm" />
                        <div className="h-4 w-28 bg-border-default/50 rounded-md" />
                    </div>

                    {/* Кнопка скачивания */}
                    <div className="w-10 h-10 rounded-xl bg-brand/20" />
                </div>
            </div>
        </div>
    );
}