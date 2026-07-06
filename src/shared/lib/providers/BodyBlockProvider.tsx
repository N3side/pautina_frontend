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
        if (count > 0) {
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = '0px';
        } else {
            // Форсируем сброс через микро-таймаут
            setTimeout(() => {
                document.body.classList.remove('modal-open');
                document.body.style.paddingRight = '0px';
                document.body.style.removeProperty('padding-right');
            }, 0);
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