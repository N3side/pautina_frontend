import toast from "react-hot-toast"
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export interface FetchResult {
    response?: any
    json?: any
}

// Добавь типы для параметров
interface FetchOptions {
    method?: string
    body?: BodyInit | null
    isToast?: boolean
    headers?: Record<string, string>
}

export async function $fetch(
    route: string,
    {method = "GET", body = null, isToast = true, headers = {}}: FetchOptions = {}
): Promise<FetchResult> {

    headers.Accept = "application/json"

    const token = safeLocalStorage.getItem("token")

    const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://5fb5469c0f3e.vps.myjino.ru/backend/api/'
        : 'http://localhost:8876/api/';

    const url = API_URL + route

    if (token) {
        headers.Authorization = "Bearer " + token
    }

    const response = await fetch(url, {
        method,
        body,
        headers
    })

    let json

    try {
        json = await response.json()
    } catch {}

    const message = json?.message

    if (message && isToast) {
        if (!response?.ok) toast.error(message)
        else toast.success(message)
    }

    console.log({response,json})

    return {response,json}
}

// тут
// мда хпхапххааха