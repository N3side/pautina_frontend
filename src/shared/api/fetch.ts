import toast from "react-hot-toast"
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";

export interface FetchResult {
    response?: any
    json?: any
}

interface FetchOptions {
    method?: string
    body?: BodyInit | null
    isToast?: boolean
    headers?: Record<string, string>
    onLoadingChange?: (loading: boolean) => void
}

export async function $fetch(
    route: string,
    {method = "GET", body = null, isToast = true, headers = {}, onLoadingChange}: FetchOptions = {}
): Promise<FetchResult> {

    headers.Accept = "application/json"

    const token = safeCookieStorage.getItem("token")

    const API_URL = process.env.NEXT_PUBLIC_ROOT_BACKEND

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

    if (json) {
        if (typeof window !== 'undefined') {
            if (json?.offer_subscription) {
                window.dispatchEvent(new CustomEvent("subscription-required"))
            }
        }
    }

    await onLoadingChange?.(false)

    return {response,json}
}