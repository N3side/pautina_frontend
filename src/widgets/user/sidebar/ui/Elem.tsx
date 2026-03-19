import Link from "next/link"
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {
    Icon?: any
    text: string
}

export default function Elem({Icon, text, ...props}: Props) { // Все остальное летит в Link
    return (
        <Link
            {...props}
            className="w-full flex gap-3 items-center py-1 pr-3 pl-1 hover:bg-surface duration-300 rounded-[8px] cursor-pointer"
        >
            {Icon && <Icon className="text-text-brand" sx={{fontSize: "24px"}} />}
            <p className="text-text-muted font-semibold text-secondary">{text}</p>
        </Link>
    )
}