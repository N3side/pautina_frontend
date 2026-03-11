import React, {HTMLAttributes, useState} from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onCopy'> {
    Icon?: React.ElementType | null;
    k: string;
    value?: string;
    onCopy?: (value: string) => void; // Теперь наш кастомный onCopy
}

export function Elem({ Icon, k, value, onCopy, ...props }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        if (value && onCopy) {
            onCopy(value);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1500); // Сбрасываем через 1.5 сек
        }
    };

    return (
        <div
            className="flex gap-4 items-center group relative cursor-pointer"
            onMouseEnter={() => onCopy && setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowSuccess(false);
            }}
            onClick={handleCopy}
            {...props}
        >
            {/* Блок иконки */}
            <div className="
                flex items-center justify-center
                w-10 h-10 min-w-[40px] rounded-xl
                bg-brand/5 text-brand/80
                border border-brand/10
                group-hover:bg-brand/10 group-hover:text-brand
                group-hover:scale-105
                transition-all duration-300
                relative overflow-hidden
            ">
                {/* Обычная иконка (исчезает при наведении) */}
                <div className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                `}>
                    {Icon && <Icon className="text-[20px]" />}
                </div>

                {/* Иконка копирования (появляется при наведении) */}
                <div className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}>
                    {showSuccess ? (
                        <CheckRoundedIcon className="text-[20px] text-green-500" />
                    ) : (
                        <ContentCopyRoundedIcon className="text-[20px]" />
                    )}
                </div>
            </div>

            {/* Текстовый блок */}
            <div className="flex flex-col gap-0.5 flex-1">
                <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted/70">
                    {k}
                </p>
                <p className="text-secondary font-medium text-text-main break-words">
                    {value || <span className="text-text-muted italic opacity-50">Не указано</span>}
                </p>
            </div>

            {/* Подсказка при наведении (опционально) */}
            {isHovered && value && !showSuccess && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-surface/90 backdrop-blur-sm border border-glass-border rounded-lg text-tiny text-text-muted whitespace-nowrap">
                    Нажмите, чтобы скопировать
                </div>
            )}
        </div>
    );
}