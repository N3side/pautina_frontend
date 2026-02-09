"use client"

import { createContext, useEffect, useState } from "react"
import { ReactNode } from "react"

// Добавляем интерфейс и дефолтные значения
interface WindowContextType {
    _window: {
        innerWidth: number | null
        innerHeight: number | null
    }
    _setWindow: (window: { innerWidth: number | null; innerHeight: number | null }) => void
}

// Меняем createContext(null) на createContext с дефолтными значениями
export const WindowContext = createContext<WindowContextType>({
    _window: {
        innerWidth: null,
        innerHeight: null
    },
    _setWindow: () => {}
})

interface Children {
    children: ReactNode
}

export function WindowProvider({ children }: Children) {

    const handleResize = () => {
        _setWindow({
            innerWidth: window.visualViewport?.width ?? window.innerWidth,
            innerHeight: window.visualViewport?.height ?? window.innerHeight,
        });
    };

    // Инициализируем состояние без доступа к window — это важно для SSR
    const [_window, _setWindow] = useState({
        innerWidth: null as number | null,
        innerHeight: null as number | null
    })

    useEffect(() => {
        // Теперь мы на клиенте — можно читать window
        _setWindow({
            innerWidth: window.visualViewport?.width ?? window.innerWidth,
            innerHeight: window.visualViewport?.height ?? window.innerHeight,
        });

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <WindowContext.Provider value={{ _window, _setWindow }}>
            {children}
        </WindowContext.Provider>
    )
}