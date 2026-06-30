import Link from "next/link"
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {
    Icon?: any
    text: string
    className?: string
    isActive?: boolean
}

export default function Chip({Icon, text, className, isActive=false, ...props}: Props) { // Все остальное летит в Link
    return (
        <Link
            {...props}
            className={`w-full flex gap-3 items-center group transition-all duration-300 rounded-[20px]  cursor-pointer ${className}`}
        >
            {Icon && <Icon className="text-text-muted transition-all group-hover:text-text-main group-hover:duration-300 duration-300" sx={{fontSize: "24px"}} />}
            <p className={`text-text-muted font-semibold text-secondary group-hover:text-text-main ${isActive && "!text-text-main"}`}>{text}</p>
        </Link>
    )
}