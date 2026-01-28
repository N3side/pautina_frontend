// utils/safeStorage.ts (или внутри файла провайдера)

export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === "undefined") return null; // Защита от SSR
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn("LocalStorage недоступен (чтение)", e);
            return null; // Если запрещено, вернем null, как будто данных нет
        }
    },
    setItem: (key: string, value: string): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn("LocalStorage недоступен (запись)", e);
            // Тут ничего не делаем, просто тема не сохранится
        }
    }
};