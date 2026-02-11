"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // 1. Указываем конкретные строковые значения вместо null
    // Используем оператор ?? 'light', чтобы всегда была строка
    const [theme, setTheme] = useState<Theme>(
        (safeLocalStorage.getItem("theme") as Theme) ?? 'light'
    );

    useEffect(() => {
        const savedTheme = safeLocalStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Теперь TypeScript спокоен, так как theme — это всегда строка
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);

        setTheme(newTheme);
        safeLocalStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);