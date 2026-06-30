import Link from "next/link"
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {
    Icon?: any
    text: string
    isActive?: boolean
}

export default function Elem({Icon, text, isActive=false, ...props}: Props) {

    return (
        <Link
            prefetch={true}
            {...props}
            className={`w-full flex gap-3 items-center py-4 pl-5 group hover:bg-surface transition-all duration-200 cursor-pointer`}
        >
            {Icon && (
                <Icon
                    className={`text-text-muted transition-colors duration-200 group-hover:text-text-main ${isActive && "!text-text-main"}`}
                    sx={{fontSize: "22px"}}
                />
            )}
            <p className={`text-text-muted font-semibold text-secondary transition-colors duration-200 group-hover:text-text-main ${isActive && "!text-text-main"}`}>
                {text}
            </p>
        </Link>
    )
}