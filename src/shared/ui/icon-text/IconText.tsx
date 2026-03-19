import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    Icon: any
    text: string
    className?: string
}

export default function IconText({Icon, text, className, ...props}: Props) {
    return (
        <div className={`cursor-pointer group flex gap-1 items-center select-none ${className}`} {...props}>
            <Icon className="text-text-muted !text-[16px]" />
            <p className="text-small text-text-muted font-medium max-w-[250px] w-full truncate group-hover:underline">{text}</p>
        </div>
    )
}