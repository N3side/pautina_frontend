"use client";

import { createContext, ReactNode, useContext, useEffect, useState, useRef } from "react";

interface BodyBlockContextType {
    isBlocked: boolean;
    setIsBlocked: (isBlocked: boolean) => void;
}

export const BodyBlockContext = createContext<BodyBlockContextType>({
    isBlocked: false,
    setIsBlocked: () => {},
});

export function BodyBlockProvider({children}: { children: ReactNode }) {
    const [isBlocked, setIsBlocked] = useState(false);
    const scrollYRef = useRef(0);

    useEffect(() => {
        if (!isBlocked) return

        scrollYRef.current = window.scrollY;
        const body = document.body

        const originalWidth = window.getComputedStyle(body).width

        body.style.position = "fixed"
        body.style.top = `-${scrollYRef.current}px`
        body.style.left = "0"
        body.style.right = "0"
        body.style.width = originalWidth
        body.style.userSelect = "none"

        return () => {
            const scrollY = scrollYRef.current
            body.style.removeProperty("position")
            body.style.removeProperty("top")
            body.style.removeProperty("left")
            body.style.removeProperty("right")
            body.style.removeProperty("width")
            body.style.removeProperty("user-select")
            window.scrollTo(0, scrollY)
        };
    }, [isBlocked]);

    return (
        <BodyBlockContext.Provider value={{isBlocked, setIsBlocked}}>
            {children}
        </BodyBlockContext.Provider>
    );
}