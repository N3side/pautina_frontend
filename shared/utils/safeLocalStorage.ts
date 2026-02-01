export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        // Проверяем ТУТ только через typeof
        if (typeof window === "undefined") return null;

        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn("LocalStorage недоступен (чтение)", e);
            return null;
        }
    },
    setItem: (key: string, value: string | number): void => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem(key, String(value));
        } catch (e) {
            console.warn("LocalStorage недоступен (запись)", e);
        }
    },
    removeItem: (key: string): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn("LocalStorage недоступен (удаление)", e);
        }
    }
};