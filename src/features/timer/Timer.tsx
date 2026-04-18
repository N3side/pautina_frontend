import {useEffect, useState} from "react";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import {formatTime} from "@/shared/lib/utils/time";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
    handleClick: () => void;
    setTimer: React.Dispatch<React.SetStateAction<number | null>>;
    timer: number | null; // Разрешаем null для типизации
    message?: string
}

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
        if (!isReady) return;

        // Если таймер сброшен – чистим localStorage и интервал
        if (timer === null) {
            safeLocalStorage.removeItem("timer_expires_at");
            return;
        }

        // Каждый раз, когда приходит НОВОЕ значение таймера с бэка
        // (или мы его восстановили из localStorage) – пересчитываем дедлайн
        const expiresAt = Date.now() + timer * 1000;
        safeLocalStorage.setItem("timer_expires_at", expiresAt);

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
    }, [isReady, timer, setTimer]);

    // Функция обертка для клика
    const onResend = () => {
        if (timer !== null) return;

        handleClick();
    };

    if (!isReady) {
        return (
            <div className="flex gap-2 items-center">
                <p className="text-small text-text-main font-medium">
                    Отправить код заново
                </p>
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