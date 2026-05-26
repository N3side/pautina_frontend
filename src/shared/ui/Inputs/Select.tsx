import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { smooth } from "@/shared/styles/animations";

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    label?: string;
    value?: string | number;
    options: Option[];
    onChange: (value: string | number) => void;
    placeholder?: string;
    error?: string;
    className?: string;
}

const Select = ({ label, value, options, onChange, placeholder = "Выберите...", error, className }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`} ref={containerRef}>
            {label && <p className="text-text-muted text-sm font-medium">{label}</p>}

            <div className="relative">
                {/* Триггер (аналог Input) */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full py-4 px-5 rounded-xl ${smooth} outline-none text-left flex justify-between items-center
                        border glass-effect text-sm font-medium transition-all
                        ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50 focus:ring-4 focus:ring-brand/10'}
                        ${!value ? 'text-text-muted/60' : 'text-text-main'}
                    `}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Выпадающий список */}
                {isOpen && (
                    <div className="absolute top-full mt-2 w-full bg-surface border border-border-default rounded-xl shadow-lg z-50 overflow-hidden py-1">
                        {options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className="px-5 py-3 hover:bg-brand/5 cursor-pointer transition-colors text-sm text-text-main"
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
};

export default Select;