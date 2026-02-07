import { PautinaText } from "@/shared/styles/typography/text";
import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/shared/utils/safeLocalStorage";
import {formatTime} from "@/shared/utils/time";

interface Props {
    handleClick: () => void;
    setTimer: React.Dispatch<React.SetStateAction<number | null>>;
    timer: number | null; // Разрешаем null для типизации
    message: string
}

import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Timer({ handleClick, timer, setTimer, message }: Props) {
    const [isReady, setIsReady] = useState(false);

    // 1. Инициализация при загрузке
    useEffect(() => {
        setIsReady(true);
        const savedExpiresAt = safeLocalStorage.getItem("timer_expires_at");

        if (savedExpiresAt) {
            const diff = Math.floor((Number(savedExpiresAt) - Date.now()) / 1000);
            if (diff > 0) {
                setTimer(diff);
            } else {
                safeLocalStorage.removeItem("timer_expires_at");
            }
        }
    }, [setTimer]);

    useEffect(() => {
        if (!isReady || timer === null) return;

        // ЗАПИСЫВАЕМ: если таймер только что появился (например, стал 60)
        // и в базе еще ничего нет, фиксируем дедлайн
        const saved = safeLocalStorage.getItem("timer_expires_at");
        if (!saved) {
            const expiresAt = Date.now() + timer * 1000;
            safeLocalStorage.setItem("timer_expires_at", expiresAt);
        }

        const id = setInterval(() => {
            setTimer((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(id);
                    safeLocalStorage.removeItem("timer_expires_at");
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);

        // Добавляем [timer === null], чтобы при первом появлении числа
        // сработала логика записи, но при тикании (59, 58...) эффект не перезапускался
    }, [isReady, timer === null, setTimer]);

    // Функция обертка для клика
    const onResend = () => {
        if (timer !== null) return;

        handleClick();
    };

    if (!isReady) {
        return (
            <div className="flex gap-2 items-center">
                <PautinaText variant="small" className="text-text-main font-medium">
                    Отправить код заново
                </PautinaText>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            <div
                onClick={onResend}
                // disabled={timer !== null}
                className={`
                    transition-colors duration-200 font-medium select-none
                    ${timer === null
                            ? "text-text-main hover:text-brand-hover cursor-pointer hover:underline underline-offset-4"
                            : "text-text-muted cursor-default"}
                    `}>
                {message}
            </div>

            {timer !== null && (
                <div className="flex items-center gap-1.5 bg-surface/50 px-2 py-0.5 rounded-md border border-border-default/50">
                    {/* Иконка часов (опционально) */}
                    <AccessTimeIcon />
                    <span className="font-mono tabular-nums text-text-muted text-xs font-semibold">
                        {formatTime(timer)}
                    </span>
            </div>
            )}
        </div>
    );
}