import React from "react"


function Container({ children, className = "", ...style }) {
    return (
        <div
            className={`mx-auto w-full max-w-[1200px] px-3 xl:px-0 ${className}`}
            {...style}
        >
            {children}
        </div>
    )
}

export { Container }