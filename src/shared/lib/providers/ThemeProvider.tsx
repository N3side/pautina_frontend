import React, { createContext, useContext, useEffect, useState } from 'react';
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

const ThemeContext = createContext<{
    theme: string;
    toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [theme, setTheme] = useState<string | null | undefined>(safeLocalStorage.getItem("theme"));

    useEffect(() => {
        // Проверка сохраненной темы или системных настроек
        const savedTheme = safeLocalStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            // Можно добавить проверку системной темы
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

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