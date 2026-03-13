import {HTMLAttributes, ReactNode} from "react";
import Link from "next/link"

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    href?: string
    className?: string
    target?: string
}

export default function NavigationLink({children, href, className, target="_self", ...props}: Props) {
    return (
        <p
            className={`
                w-fit text-small cursor-pointer whitespace-nowrap transition-colors duration-200 font-semibold text-[15px]
                text-text-muted hover:text-text-main ${className}
            `}
            {...props}
        >
            <Link href={href || ""} target={target}>
                {children}
            </Link>
        </p>
    )
}