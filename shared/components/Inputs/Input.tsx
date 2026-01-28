import React from 'react';
import { COLORS, colorStyles } from "@/shared/cat/colors";
import { PautinaText } from "@/shared/cat/typography/text";
import { InputHTMLAttributes } from "react";

const INPUT_CLASSES = `
  w-full px-5 py-4 rounded-xl transition-all duration-200 outline-none
  border border-[1px] border-gray-200 bg-input text-text-main
  focus: border-[2px]
  placeholder:text-text-muted
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | null;
    error?: string | null;
    selected?: boolean;
}

const Input = ({ label, error, selected, className, style, ...props }: InputProps) => {
    return (
        <div className={`flex flex-col gap-2 w-full ${className || ''}`}>
            {label && (
                <label htmlFor={props.id} className="font-bold text-[14px] ml-1">
                    <PautinaText variant="secondary" className="text-text-main" style={{ fontWeight: 700 }}>
                        {label}
                    </PautinaText>
                </label>
            )}

            <input
                className={INPUT_CLASSES}
                style={{
                    border: `${selected ? 2 : 1}px solid ${selected ? "var(--color-border-default)" : "var(--color-border-default)"}`,
                    ...style,
                }}
                {...props}
            />

            {error && (
                <span className="text-red-500 text-sm ml-1">{error}</span>
            )}
        </div>
    );
};

export default Input;