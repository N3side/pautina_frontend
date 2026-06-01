import React, { TextareaHTMLAttributes } from 'react';
import { smooth } from "@/shared/styles/animations";

// Используем те же базовые классы для идентичного вида
const BASE_TEXTAREA_CLASSES = `
  w-full py-4 rounded-xl ${smooth} outline-none
  border glass-effect text-text-main text-sm font-medium
  placeholder:text-text-muted/60
  focus:ring-4 focus:ring-brand/10 focus:bg-surface
  disabled:opacity-50 disabled:cursor-not-allowed
  resize-none min-h-[120px]
`;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | null;
    error?: string | null;
    selected?: boolean;
    inputClassName?: string
}

const Textarea = ({
      label,
      error,
      selected,
      className,
      inputClassName,
      style,
      value,
      defaultValue,
      ...props
  }: TextareaProps) => {

    const dynamicStyles = {
        borderColor: error
            ? '#ef4444'
            : (selected ? 'var(--color-brand)' : 'var(--color-border-default)'),
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        ...style,
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <p className="text-label ml-1">
                    {label}
                </p>
            )}

            <div className="relative group">
                <textarea
                    className={`${BASE_TEXTAREA_CLASSES} ${inputClassName} ${
                        error ? 'border-red-500' : 'border-border-default hover:border-brand/50'
                    }`}
                    style={dynamicStyles}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={props?.placeholder || "Введите текст..."}
                    {...props}
                />

                {error && (
                    <div className="absolute right-4 top-4 text-red-500 animate-pulse">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </div>

            {error && (
                <div className="min-h-[20px] ml-1">
                    <span className="text-red-500 text-[12px] font-medium leading-none transition-all">
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Textarea;