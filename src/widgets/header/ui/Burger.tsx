import React from "react"

interface Props {
    isActive?: boolean
    setIsActive?: (value: boolean) => void
}

export function Burger({ isActive, setIsActive }: Props) {
    const hLine = "h-[2px]" // Сделал чуть тоньше (2px), на мобилках смотрится аккуратнее
    const color = "bg-text-muted"
    const baseClass = `absolute block w-full rounded-full transition-all duration-300 ease-in-out ${hLine} ${color}`

    return (
        <button
            className="relative w-7 h-5 cursor-pointer z-50 focus:outline-none"
            onClick={() => setIsActive && setIsActive(!isActive)}
            aria-label="Меню"
        >
            <div className="relative w-full h-full">
                {/* ВЕРХНЯЯ ЛИНИЯ: при активации прыгает в центр и поворачивается */}
                <span
                    className={`
                        ${baseClass}
                        ${isActive
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                    }
                    `}
                />

                {/* СРЕДНЯЯ ЛИНИЯ: просто исчезает */}
                <span
                    className={`
                        ${baseClass} top-1/2 -translate-y-1/2 transition-all duration-300
                        ${isActive ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}
                    `}
                />

                {/* НИЖНЯЯ ЛИНИЯ: прыгает в центр и поворачивается в другую сторону */}
                <span
                    className={`
                        ${baseClass}
                        ${isActive
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-0"
                    }
                    `}
                />
            </div>
        </button>
    )
}