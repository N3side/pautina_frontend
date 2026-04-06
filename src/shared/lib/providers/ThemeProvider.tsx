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
            console.log("тема: ", theme) // выводит 'dark'
            if (theme == 'dark') {
                console.log("добавить класс")
                document.documentElement.classList.add('dark');
            } else {
                console.log("убрать класс")
                // document.documentElement.classList.remove('dark');
            }
        })()
    `}} suppressHydrationWarning />
);

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme | undefined>(undefined);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setThemeState(isDark ? 'dark' : 'light');
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        safeCookieStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
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
        };
    }

    const toggleTheme = () => {
        const next = context.theme === "dark" ? "light" : "dark";
        context.setTheme(next);
    };

    return { ...context, toggleTheme };
}