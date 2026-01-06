"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

// Интерфейс для ответа от API
interface UserResponse {
    json?: {
        user?: any;
    };
}

// 1. Определи интерфейс
interface UserContextType {
    user: any;
    setUser: (user: any) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

// 2. Измени эту строку - добавь дефолтные значения
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    isLoading: true,
    setIsLoading: () => {}
})

interface UserProviderProps {
    children: ReactNode;
}

export default function UserProvider({children}: UserProviderProps) {

    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getUser(): Promise<void> {
        const response = await $fetch("me", {isToast: false}) as UserResponse

        setUser(response?.json?.user)

        setIsLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [token]);

    return (
        <UserContext.Provider value={{user, setUser, token, setToken, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )

}

// Остальной код без изменений...
export function CheckUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading, setUser } = useContext(UserContext)
    const router = useRouter()

    if (typeof window !== 'undefined' && !localStorage.getItem("token")) {
        toast.error("Вы не авторизованы")
        router.push("/login")
    }

    useEffect(() => {

        if (isLoading) {
            const id = toast.loading("Проверка авторизации...")
            return () => toast.dismiss(id)
        }

        if (!user) {
            setUser(null)
            toast.error("Вы не авторизованы")
            router.push("/login")
        }

    }, [isLoading, user, router]);

    if (isLoading) return null

    if (!user) {
        setUser(null)
        return null
    }

    return children
}

export function CheckIsNotUser({ children }: { children: React.ReactNode }) {
    const { user, isLoading, setUser } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {

        if (isLoading) {
            const id = toast.loading("Проверка авторизации...")
            return () => toast.dismiss(id)
        }

        if (user) {
            toast.success("Вы авторизованы")
            router.push("/profile")
            return
        }

    }, [isLoading, user, router])

    if (isLoading) return null

    if (user) return null

    return children
}