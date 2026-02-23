import { ReactNode } from "react"

interface IconWrapperProps {
    children: ReactNode
    className?: string
    style?: any
}

export function IconWrapper({ children, className="", style }: IconWrapperProps) {
    return (
        <div className={`flex items-center justify-center rounded-[50%] bg-[#F0F9FF] ${className}`} style={style}>
            {children}
        </div>
    );
}

