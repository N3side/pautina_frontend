import React from "react"

export interface ContainerProps extends React.HTMLProps<HTMLDivElement> { }

function Container({ children, className = "", ...style }: ContainerProps) {
    return (
        <div
            className={`mx-auto w-full max-w-[1200px] bg-[transparent] px-5 xl:px-0 ${className}`}
            {...style}
        >
            {children}
        </div>
    )
}

export { Container }