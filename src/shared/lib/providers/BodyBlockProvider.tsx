"use client";

import { createContext, ReactNode, useState, useEffect } from "react";

interface BodyBlockContextType {
    isBlocked: boolean;
    setIsBlocked: (isBlocked: boolean) => void;
}

export const BodyBlockContext = createContext<BodyBlockContextType>({
    isBlocked: false,
    setIsBlocked: () => {},
});

export function BodyBlockProvider({ children }: { children: ReactNode }) {
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const body = document.body;
        const html = document.documentElement;

        if (isBlocked) {
            // 1. Вычисляем ширину скроллбара, чтобы страница не "прыгала" вправо
            const scrollBarWidth = window ? window?.innerWidth - html.clientWidth : 0;

            body.style.overflow = "hidden";
            body.style.paddingRight = scrollBarWidth + "px"

            // Если фон все равно ломается, принудительно фиксируем его на html
            // html.style.backgroundColor = "var(--bg-loginPage)"; // Опциональный костыль
        } else {
            // 3. Чистим за собой
            body.style.removeProperty("overflow");
            body.style.removeProperty("padding-right");
        }

        return () => {
            body.style.removeProperty("overflow");
            body.style.removeProperty("padding-right");
        };
    }, [isBlocked]);

    return (
        <BodyBlockContext.Provider value={{ isBlocked, setIsBlocked }}>
            {children}
        </BodyBlockContext.Provider>
    );
}