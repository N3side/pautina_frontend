"use client"

import React, { TextareaHTMLAttributes, useRef, useEffect } from 'react';
import { smooth } from "@/shared/styles/animations";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string | null;
    error?: string | null;
    selected?: boolean;
    inputClassName?: string;
    autoResize?: boolean;
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
                      autoResize = false,
                      onChange,
                      ...props
                  }: TextareaProps) => {

    // Динамически управляем минимальной высотой:
    // Если autoResize — даем высоту под одну строку (52px с учетом py-4), иначе оставляем стандартные 120px
    const BASE_TEXTAREA_CLASSES = `
      w-full py-4 rounded-xl ${smooth} outline-none
      border glass-effect text-text-main text-sm font-medium
      placeholder:text-text-muted/60
      focus:ring-4 focus:ring-brand/10 focus:bg-surface
      disabled:opacity-50 disabled:cursor-not-allowed
      resize-none ${autoResize ? "min-h-0" : "min-h-[120px]"}
    `;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea && autoResize) {
            textarea.style.height = 'auto'; // Сбрасываем, чтобы поймать уменьшение текста
            textarea.style.height = `${textarea.scrollHeight}px`; // Расширяем строго по контенту
        }
    };

    useEffect(() => {
        if (autoResize) {
            adjustHeight();
        }
    }, [value, defaultValue, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (autoResize) {
            adjustHeight();
        }
        if (onChange) {
            onChange(e);
        }
    };

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
                    ref={textareaRef}
                    className={`${BASE_TEXTAREA_CLASSES} ${inputClassName} ${
                        error ? 'border-red-500' : 'border-border-default hover:border-brand/50'
                    }`}
                    style={dynamicStyles}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={props?.placeholder || "Введите text..."}
                    onChange={handleChange}
                    // КРИТИЧНО: заставляем браузер рендерить 1 строку по дефолту, если включен autoResize
                    rows={autoResize ? 1 : props.rows}
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