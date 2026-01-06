import toast from "react-hot-toast"

interface FetchResult {
    response: Response
    json: unknown
}

// Добавь типы для параметров
interface FetchOptions {
    method?: string
    body?: BodyInit | null  // Измени на BodyInit | null
    isToast?: boolean
    headers?: Record<string, string>
}

export async function $fetch(
    route: string,
    {method = "GET", body = null, isToast = true, headers = {}}: FetchOptions = {}
): Promise<FetchResult> {

    headers.Accept = "application/json"

    const token = localStorage.getItem("token")

    const url = "http://localhost:8876/api/" + route

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