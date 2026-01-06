import React from "react"
import clsx from "clsx"

export interface ShadowWrapperProps
    extends React.HTMLAttributes<HTMLDivElement> {
    blur?: number
    opacity?: number
    offsetY?: number
}

export function ShadowWrapper({
    children,
    blur = 14,
    opacity = 0.4,
    offsetY = 12,
    className,
    style,
    ...props
}: ShadowWrapperProps) {
    return (
        <div
            className={clsx("relative inline-block z-0", className)}
            style={style}
            {...props}
        >
            {/* Тень */}
            <div
                aria-hidden
                className="absolute inset-0 z-0"
                style={{
                    transform: `translateY(${offsetY}px)`,
                    filter: `blur(${blur}px)`,
                    opacity,
                }}
            >
                {children}
            </div>

            {/* Контент */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}