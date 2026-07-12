import React, { useState, useRef, useEffect } from 'react';
import { smooth } from "@/shared/styles/animations";

interface Option {
    label: string;
    value: string | number | boolean;
}

interface SelectProps {
    label?: string;
    value?: string | number;
    defaultValue?: string | number;
    options: Option[];
    onChange: (value: string | number | boolean) => void;
    placeholder?: string;
    error?: string;
    className?: string;
    name?: string;
}

export default function Select({
       label,
       value: externalValue,
       defaultValue,
       options,
       onChange,
       placeholder = "Выберите...",
       error,
       className,
       name
   }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Инициализируем сразу, но это сработает только для синхронных данных
    const [internalValue, setInternalValue] = useState<string | number | boolean>(defaultValue ?? '');

    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    // 🔥 ФИКС: Синхронизируем internalValue когда defaultValue меняется (например, после загрузки с API)
    useEffect(() => {
        if (defaultValue !== undefined && defaultValue !== null) {
            setInternalValue(defaultValue);
        }
    }, [defaultValue]);

    const currentValue = externalValue !== undefined ? externalValue : internalValue;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Обновляем скрытый input при изменении currentValue
    useEffect(() => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = String(currentValue ?? '');
        }
    }, [currentValue]);

    const selectedOption = options.find(opt => opt.value === currentValue);

    const handleSelect = (value: string | number | boolean) => {
        // Если компонент неконтролируемый (нет externalValue), обновляем internalValue
        if (externalValue === undefined) {
            setInternalValue(value);
        }
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`} ref={containerRef}>
            {label && <p className="text-text-muted text-sm font-medium">{label}</p>}

            <div className="relative">
                {name && (
                    <input
                        ref={hiddenInputRef}
                        type="hidden"
                        name={name}
                        value={String(currentValue) ?? ''}
                    />
                )}

                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full py-4 px-5 rounded-xl ${smooth} outline-none text-left flex justify-between items-center
                        border glass-effect text-sm font-medium transition-all
                        ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50 focus:ring-4 focus:ring-brand/10'}
                        ${!currentValue && currentValue !== 0 ? 'text-text-muted/60' : 'text-text-main'}
                    `}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute top-full mt-2 w-full bg-surface border border-border-default rounded-xl shadow-lg z-50 overflow-hidden py-1">
                        {options.map((opt, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelect(opt.value)}
                                className={`px-5 py-3 hover:bg-brand/5 cursor-pointer transition-colors text-sm 
                                    ${currentValue === opt.value ? 'bg-brand/10 text-brand' : 'text-text-main'}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <span className="text-red-500 text-[12px] ml-1">{error}</span>}
        </div>
    );
}