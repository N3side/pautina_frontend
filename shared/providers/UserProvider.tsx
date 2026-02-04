"use client"

import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { $fetch } from "@/shared/api/fetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

interface UserResponse {
    json?: {
        user?: any;
    };
}

interface UserContextType {
    user: any;
    setUser: (user: any) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    isLoading: true,
    setIsLoading: () => {}
})

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()

    // Оборачиваем в useCallback, чтобы функция не пересоздавалась
    const getUser = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await $fetch("me", { isToast: false }) as UserResponse
            if (response?.json?.user) {
                setUser(response.json.user)
            } else {
                setUser(null)
            }
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Инициализация при первой загрузке
    useEffect(() => {
        const savedToken = safeLocalStorage.getItem("token")
        if (savedToken) {
            setToken(savedToken) // Это вызовет срабатывание useEffect ниже
        } else {
            setIsLoading(false)
        }

    }, [])

    useEffect(() => {
        if (user?.isGuest) {
            router.push("/register")
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            safeLocalStorage.setItem("token", token)
            getUser()
        } else if (token === null && !isLoading) {
            // Если токен явно сбросили в null
            safeLocalStorage.removeItem("token")
            setUser(null)
        }
    }, [token, getUser])

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export function CheckUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            toast.error("Вы не авторизованы")
            router.replace("/login")
        }
    }, [isLoading, user, router])

    if (isLoading || !user) return null
    return <>{children}</>
}

export function CheckIsNotUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && user) {
            router.replace("/profile")
        }
    }, [isLoading, user, router])

    if (isLoading || user) return null
    return <>{children}</>
}

export function CheckGuest({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        // 1. Ждем завершения загрузки
        if (isLoading) return;

        // 2. Если юзер авторизован И он уже НЕ гость (isGuest === false)
        // Выкидываем его, чтобы он не заполнил регистрацию второй раз
        if (user && user?.isGuest === false) {
            toast.error("Вы уже зарегистрированы");
            router.replace("/profile");
        }
    }, [isLoading, user, router]);

    if (isLoading) return null;

    // 4. Рендерим контент если:
    // - Юзера еще нет (аноним, пришел на 1-й шаг)
    // - Юзер есть и он всё еще гость (проходит шаги)
    if (!user || user.isGuest === true) {
        return <>{children}</>;
    }

    // Во всех остальных случаях (юзер уже полноценный) — ничего не рендерим,
    // так как сработает редирект из useEffect
    return null;
}