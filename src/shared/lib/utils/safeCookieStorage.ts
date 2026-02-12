import Cookies from 'js-cookie';

const COOKIE_DOMAIN = "." + process.env.NEXT_PUBLIC_ROOT_DOMAIN

export const safeCookieStorage = {
    getItem: (key: string): string | null => {
        // На сервере Cookies.get() вернет undefined, так что проверка window не обязательна, но для симметрии ок
        if (typeof window === "undefined") return null;

        try {
            return Cookies.get(key) || null;
        } catch (e) {
            console.warn("Cookie недоступны (чтение)", e);
            return null;
        }
    },

    setItem: (key: string, value: string | number, expiresDays: number = 7): void => {
        if (typeof window === "undefined") return;

        try {
            Cookies.set(key, String(value), {
                expires: expiresDays, // Срок жизни в днях
                domain: COOKIE_DOMAIN, // КЛЮЧЕВОЙ МОМЕНТ
                path: '/',            // Доступно везде
                sameSite: 'Lax'       // Для безопасности
            });
        } catch (e) {
            console.warn("Cookie недоступны (запись)", e);
        }
    },

    removeItem: (key: string): void => {
        if (typeof window === "undefined") return;
        try {
            // При удалении тоже нужно указывать домен, иначе не удалится
            Cookies.remove(key, { domain: COOKIE_DOMAIN, path: '/' });
        } catch (e) {
            console.warn("Cookie недоступны (удаление)", e);
        }
    }
}