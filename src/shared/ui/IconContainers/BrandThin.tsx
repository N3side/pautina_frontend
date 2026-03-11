import React, {ReactNode} from "react";

interface Props {
    children: ReactNode
    [key: string]: any
}

export default function BrandThin({children, ...props}: Props) {
    return (
        <div className="group">
            <div className="
                flex items-center justify-center
                w-10 h-10 min-w-[40px] rounded-xl
                bg-brand/5 text-brand/80
                border border-brand/10
                group-hover:bg-brand/10 group-hover:text-brand
                group-hover:scale-105
                transition-all duration-300
            "
                 {...props}
            >
                {children}
            </div>
        </div>
    )
}