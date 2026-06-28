"use client";

import { createContext, ReactNode, useState, useEffect } from "react";

interface BodyBlockContextType {
    block: () => void;
    unblock: () => void;
}

export const BodyBlockContext = createContext<BodyBlockContextType>({
    block: () => {},
    unblock: () => {},
});

export function BodyBlockProvider({ children }: { children: ReactNode }) {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        console.log(count)
        if (count > 0) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [count]);

    const block = () => setCount(prev => prev + 1);
    // Теперь это функция, которая правильно вызывает обновление состояния
    const unblock = () => setCount(prev => Math.max(0, prev - 1));

    return (
        <BodyBlockContext.Provider value={{ block, unblock }}>
            {children}
        </BodyBlockContext.Provider>
    );
}