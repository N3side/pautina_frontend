import {ButtonHTMLAttributes, ElementType} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    className?: string
    Icon?: ElementType
}

export default function ActionButton({text, Icon, className, children, ...props}: Props) {
    return (
        <button
            className={`cursor-pointer border rounded-xl px-6 py-2.5 normal-case text-text-muted border-border-default hover:bg-input transition-all flex justify-center items-center gap-3 ${className}`}
            type="button"
            {...props}
        >
            <div className="flex gap-2 items-center">
                {Icon ? <Icon className="text-text-muted"/> : undefined}
                <p className="text-small font-semibold">{text}</p>
                {children}
            </div>

        </button>
    )
}