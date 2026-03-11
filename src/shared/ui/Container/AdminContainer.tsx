import {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

export default function AdminContainer({children, className, ...props}: Props) {
    return (
        <div
            className={`mx-auto w-full px-3 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}