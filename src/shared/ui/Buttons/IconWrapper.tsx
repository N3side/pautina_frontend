import React, {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

export default function IconWrapper({children, className, ...props}: Props) {
    return (
        <div
            className={`
               !min-w-[44px] !w-11 !h-11 !rounded-xl
               glass-effect
               !border !border-border-default hover:!border-brand/30
               !text-text-muted hover:!text-brand
               !transition-all !duration-300
               flex justify-center items-center
               cursor-pointer
               ${className}
            `}
            {...props}
        >
            {children}
        </div>
    )
}