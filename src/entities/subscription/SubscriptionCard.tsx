import React from 'react';

interface SubscriptionCardProps {
    tariff: Record<string, any>;
    startAt: string;
    endAt: string;
    canceled: boolean;
    autopay: boolean;
}

export default function SubscriptionCard({ tariff, startAt, endAt, canceled, autopay }: SubscriptionCardProps) {
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);
    const now = new Date();

    // Считаем дни точнее, чтобы не было отрицательного прогресса
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const daysSinceStart = Math.max(0, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Вычисляем процент для прогресс-бара
    const progressPercent = totalDays > 0 ? Math.min(100, (daysSinceStart / totalDays) * 100) : 100;
    const isActive = daysRemaining > 0 && !canceled;

    const formatDate = (date: Date) => {
        // Короткий формат (например: 12 авг. 2026) смотрится аккуратнее в UI
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="glass-effect relative overflow-hidden p-6 md:p-8 rounded-[24px] group transition-all duration-300 hover:shadow-lg">

            {/* Декоративный светящийся блюр в правом верхнем углу.
                Он использует твой градиент и дает карточке объем на фоне стекла */}
            <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[70px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'var(--subscription-color)' }}
            />

            <div className="relative z-10">
                {/* 1. Шапка карточки */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-text-main font-black tracking-tight uppercase md:text-2xl text-xl">
                                {tariff?.name || 'Тариф'}
                            </h3>
                            {/* Статусные бейджики */}
                            {canceled ? (
                                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-label border border-red-500/20">
                                    Отменена
                                </span>
                            ) : isActive ? (
                                <span className="px-2.5 py-1 rounded-full bg-green-main/10 text-[var(--green-main)] text-label border border-[var(--green-main)]/20">
                                    Активна
                                </span>
                            ) : (
                                <span className="px-2.5 py-1 rounded-full bg-gray-500/10 text-text-muted text-label border border-gray-500/20">
                                    Истекла
                                </span>
                            )}
                        </div>
                        <p className="text-text-muted text-sm font-medium">
                            Управление подпиской
                        </p>
                    </div>

                    {/* Блок с оставшимися днями (Крупный акцент) */}
                    <div className="text-right flex flex-col items-end">
                        <span className="text-4xl md:text-3xl font-black text-text-main leading-none drop-shadow-sm">
                            {daysRemaining}
                        </span>
                        <span className="text-label text-text-brand mt-1">
                            {daysRemaining > 0 ? 'Дней осталось' : 'Завершена'}
                        </span>
                    </div>
                </div>

                {/* 2. Прогресс-бар использования подписки */}
                <div className="w-full bg-text-muted/15 rounded-full h-2.5 mb-6 overflow-hidden backdrop-blur-sm border border-white/5 shadow-inner">
                    <div
                        className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: `${progressPercent}%`,
                            background: canceled ? '#ef4444' : 'var(--subscription-color)',
                            boxShadow: '0 0 12px rgba(14, 165, 233, 0.4)'
                        }}
                    />
                </div>

                {/* 3. Подвал с датами и автопродлением */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex gap-6 md:gap-10">
                        <div>
                            <p className="text-label text-text-muted mb-0.5">Начало</p>
                            <p className="text-text-main text-sm font-bold">{formatDate(startDate)}</p>
                        </div>
                        <div>
                            <p className="text-label text-text-muted mb-0.5">Окончание</p>
                            <p className="text-text-main text-sm font-bold">{formatDate(endDate)}</p>
                        </div>
                    </div>

                    {/* Плашка автопродления с пульсирующим индикатором */}
                    {autopay && !canceled && (
                        <div className="flex items-center gap-2 bg-green-main/5 px-3 py-1.5 rounded-xl border border-green-main/10 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[var(--green-main)] animate-pulse shadow-[0_0_8px_var(--green-main)]" />
                            <span className="text-label !text-[var(--green-main)] !mb-0 !ml-0 tracking-wide">
                                Автопродление
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}