"use client"

import { useEffect, useState } from "react";

export default function HeaderPromoTimer() {
    const TARGET_DATE = "2026-05-24T23:59:00";

    const calculateTimeLeft = () => {
        const diff = +new Date(TARGET_DATE) - +new Date();
        if (diff <= 0) return null;

        return {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),
            m: Math.floor((diff / 1000 / 60) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTime(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    return (
        <a
            href="https://forms.gle/g6ho9FSnKF5ZAtcP6" // Сюда ссылку на форму
            target="_blankп"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/10 hover:bg-brand/20 border border-brand/20 transition-colors text-xs font-medium text-text-main shrink-0 select-none"
        >
            <span className="text-brand">🔒</span>
            <span>Тестирование:</span>
            <span className="font-bold text-brand tabular-nums">
                {time.d}д {time.h.toString().padStart(2, '0')}ч {time.m.toString().padStart(2, '0')}м {time.s.toString().padStart(2, '0')}с
            </span>
        </a>
    );
}