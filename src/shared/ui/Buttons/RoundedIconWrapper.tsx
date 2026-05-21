import {ElementType} from "react";
import {Icon} from "@mui/material";

interface Props {
    Icon: ElementType
    className?: string
    IconClassName?: string
    [key: string]: any
}

export default function RoundedIconWrapper({Icon, className, IconClassName, ...props}: Props) {
    return (
        <button
            className={`rounded-full w-[18px] aspect-square bg-surface transition-all duration-300 hover:rotate-90 flex justify-center items-center ${className}`}
            type="button"
            {...props}
        >
            <Icon
                className={`!text-[12px] ${IconClassName}`}
            />
        </button>
    )
}