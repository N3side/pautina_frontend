import React from 'react';

interface Props {
    // Используем React.ElementType вместо any для корректной типизации компонентов
    Icon?: React.ElementType | null;
    k: string;
    value?: string;
}

export function Elem({ Icon, k, value }: Props) {

    return (
        <div className="flex gap-4 items-center group">
            {/* Рендерим блок иконки, только если сама иконка передана */}
            {Icon && (
                <div className="
                    flex items-center justify-center
                    w-10 h-10 min-w-[40px] rounded-xl
                    bg-brand/5 text-brand/80
                    border border-brand/10
                    group-hover:bg-brand/10 group-hover:text-brand
                    group-hover:scale-105
                    transition-all duration-300
                ">
                    <Icon className="text-[20px]" />
                </div>
            )}

            <div className="flex flex-col gap-0.5">
                <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted/70">
                    {k}
                </p>
                <p className="text-secondary font-medium text-text-main break-words">
                    {value || <span className="text-text-muted italic opacity-50">Не указано</span>}
                </p>
            </div>
        </div>
    )
}