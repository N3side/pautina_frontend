"use client"

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import {fetchMe} from "@/entities/user/api/fetchMe";

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
        const userData = await fetchMe()
        setUser(userData)
        setIsLoading(false)
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
        if (token) {
            safeLocalStorage.setItem("token", token)
            getUser()
        } else if (token === null && !isLoading) {
            // Если токен явно сбросили в null
            safeLocalStorage.removeItem("token")
            setUser(null)
        }
    }, [token, getUser, router])

    useEffect(() => {
        if (user?.isGuest) {
            router.push("/register")
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    )
}