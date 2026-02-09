import { colorStyles } from "@/shared/styles/colors";
import { PautinaText } from "@/shared/styles/typography/text";
import React, { HTMLAttributes } from "react";

// Наследуемся от стандартных атрибутов div, чтобы onClick и прочие пропсы подхватились автоматически
interface OptionProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    selected: boolean;
}

export default function Option({ text, selected, className, style, ...props }: OptionProps) {
    return (
        <div
            style={{
                border: `${1}px solid ${selected ? "var(--color-brand)" : "var(--color-border-default)"}`,
                ...style
            }}
            className={`
                w-full p-4 rounded-xl cursor-pointer
                transition-all duration-200 ease-in-out
                hover:border-brand-light hover:bg-brand-light/5
                active:scale-[0.98]
                ${className || ''}
            `}
            {...props}
        >
            <PautinaText variant="small">
                {text}
            </PautinaText>
        </div>
    );
}