import {notify} from "./notify.tsx";

interface iParams {
    method?: string,
    body?: any | null
}

export async function $fetch(
    route: string,
    {
        method="GET",
        body=undefined
    }:
    iParams={})
{
    const headers: any = {}

    const token = localStorage.getItem('token')

    const url = "http://localhost:8876/api/" + route

    headers.Authorization = "Bearer " + token

    const response = await fetch(url, {
        method,
        body,
        headers
    })

    let json

    try {
        json = await response?.json()
    } catch {
        json = null
    }

    const message: string = json?.message

    if (message) {
        notify(message)
    }

    notify("Тест")

    return {response,json}
}