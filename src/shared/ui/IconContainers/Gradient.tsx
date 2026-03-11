import React, {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export default function Gradient({children}: Props) {
    return (
        <div
            className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl shadow-lg"
            style={{
                // Градиент от фиолетового к синему и голубому (обратная радуга)
                background: 'linear-gradient(135deg, #9333ea, #4f46e5, #0ea5e9, #06b6d4)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 5s ease infinite'
            }}
        >
            {children}
        </div>
    )
}