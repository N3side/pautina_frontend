"use client"

import React from 'react';

export default function ProjectCardSkeleton() {
    return (
        <div
            className="
                group relative overflow-hidden duration-300
                rounded-2xl
                animate-pulse
            "
        >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">

                {/* Левая часть - имитация Gallery */}
                <div className="w-full h-full min-h-[200px] bg-border-default/40" />

                {/* Правая часть - контент */}
                <div className="flex min-w-0 flex-col px-2 py-4 sm:px-5 justify-between">

                    <div className="flex flex-col gap-3">
                        {/* Верхняя часть с годом и кнопкой Live */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                {/* Год */}
                                <div className="h-3 w-16 bg-border-default/30 rounded-md" />
                                {/* Заголовок */}
                                <div className="h-6 w-3/4 bg-border-default/60 rounded-md mt-1.5" />
                            </div>
                            {/* Кнопка Live */}
                            <div className="h-9 w-16 bg-border-default/30 rounded-lg" />
                        </div>

                        {/* Описание (3 строки) */}
                        <div className="space-y-1.5 mt-1">
                            <div className="h-3 w-full bg-border-default/20 rounded-sm" />
                            <div className="h-3 w-11/12 bg-border-default/20 rounded-sm" />
                            <div className="h-3 w-9/12 bg-border-default/20 rounded-sm" />
                        </div>

                        {/* Стеки */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            <div className="h-7 w-16 bg-border-default/20 rounded-lg" />
                            <div className="h-7 w-16 bg-border-default/20 rounded-lg" />
                            <div className="h-7 w-16 bg-border-default/20 rounded-lg" />
                            <div className="h-7 w-14 bg-border-default/20 rounded-lg" />
                        </div>

                        {/* Футер с кнопкой и датами */}
                        <div className="flex items-end justify-between mt-3">
                            <div className="h-9 w-28 bg-brand/20 rounded-xl" /> {/* Кнопка Редактировать/Подробнее */}
                            <div className="h-4 w-32 bg-border-default/30 rounded-md" /> {/* Даты */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}