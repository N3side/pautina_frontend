"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { safeCookieStorage } from "@/shared/lib/utils/safeCookieStorage";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme | undefined;
    setTheme: (t: Theme) => void;
}

export const ThemeScript = () => (
    <script dangerouslySetInnerHTML={{ __html: `
        (function() {
            var theme = document.cookie.match(/theme=([^;]+)/)?.[1] || "dark";
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.style.colorScheme = theme;
        })()
    `}} suppressHydrationWarning />
);

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme | undefined>(undefined);

    useEffect(() => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme') as Theme || "dark";
        setThemeState(current);
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        safeCookieStorage.setItem("theme", newTheme);
        const root = document.documentElement;
        root.setAttribute('data-theme', newTheme);
        root.style.colorScheme = newTheme;
    };

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            theme: "dark" as Theme,
            setTheme: () => {},
            toggleTheme: () => {}
        }; //1
    }

    const toggleTheme = () => {
        const next = context.theme === "dark" ? "light" : "dark";
        context.setTheme(next);
    };

    return { ...context, toggleTheme };
}