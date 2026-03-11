import {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: ReactNode
    isOpen?: boolean
}

export default function BurgerMenu({className, children, isOpen=false, ...props}: Props) {
    return (
        <div
            className={`transition-all transition-opacity-400 fixed w-[80vw] h-[100vh] top-0 z-100 glass-effect ${className} ${isOpen ? "left-[-100vw]" : "left-0"}`}
            {...props}
        >
            {children}
        </div>
    )
}