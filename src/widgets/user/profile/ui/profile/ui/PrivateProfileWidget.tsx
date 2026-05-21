"use client";

import React, {useEffect, useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const PrivateProfileWidget = () => {
    const [mounted, setMounted] = useState(false);

    // Ждем монтирования на клиенте, чтобы избежать несоответствия гидратации
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Или скелетон

    return (
        <div
            className={`
                relative p-4 rounded-[18px]
                flex items-center
                glass-effect
                border border-border-glass
                gap-4
            `}
        >
            <div
                className={`
                  p-4 rounded-full
                  /* Твой бренд или нейтральный фон для иконки */
                  bg-brand/10 dark:bg-brand/20
                  border-4 border-white/10 dark:border-white/5
                `}
            >
                <LockOutlinedIcon
                    className="text-[32px] text-text-brand"
                />
            </div>

            <div className="flex flex-col items-start">
                <h3
                    className="text-large font-bold text-text-main"
                >
                    Профиль скрыт
                </h3>

                <p
                    className="text-secondary text-text-muted"
                >
                    Пользователь сделал этот аккаунт приватным
                </p>
            </div>
        </div>
    );
};