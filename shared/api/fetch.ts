import toast from "react-hot-toast"

interface FetchResult {
    response: Response
    json: unknown
}

export async function $fetch(route: string, {method="GET", body=undefined, isToast=true, headers={}}={}): Promise<FetchResult> {

    headers.Accept = "application/json"

    const token = localStorage.getItem("token")

    const url = "http://localhost:8876/api/" + route

    if (token) {
        headers.Authorization = "Bearer " + token
    }

    const response: FetchResult = await fetch(url, {
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