import React, { useRef } from 'react';
import { PautinaText } from "@/shared/cat/typography/text";
import { InputHTMLAttributes } from "react";
import { IMaskInput } from 'react-imask';

const INPUT_CLASSES = `
  w-full px-5 py-4 rounded-xl transition-all duration-200 outline-none
  border border-[1px] border-gray-200 bg-input text-text-main
  focus:border-brand focus:border-[2px]
  placeholder:text-text-muted
`;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string | null;
    error?: string | null;
    selected?: boolean;
    mask?: any; // Строка типа "+7 (000) 000-00-00" или объект настроек IMask
    onAccept?: (value: string, maskRef: any) => void; // Специальный колбэк для imask
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, error, selected, className, style, mask, onAccept, onChange, ...props }: InputProps) => {

    const inputStyle = {
        border: `1px solid ${selected ? "var(--color-brand)" : "var(--color-border-default)"}`,
        ...style,
    };

    return (
        <div className={`flex flex-col gap-2 w-full ${className || ''}`}>
            {label && (
                <label className="font-bold text-[14px] ml-1 text-text-main">
                    {label}
                </label>
            )}

            {mask ? (
                <IMaskInput
                    mask={mask}
                    unmask={false} // Если true, в state будет уходить "7999...", если false — "+7 (999)..."
                    onAccept={onAccept}
                    // @ts-ignore - imask иногда конфликтует с типами реакта, но работает корректно
                    className={INPUT_CLASSES}
                    style={inputStyle}
                    {...props}
                />
            ) : (
                <input
                    className={INPUT_CLASSES}
                    style={inputStyle}
                    onChange={onChange}
                    {...props}
                    placeholder="Пусто"
                />
            )}

            {error && (
                <span className="text-red-500 text-sm ml-1">{error}</span>
            )}
        </div>
    );
};

export default Input;