import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";

export function useThemes() {

    const [themes, setThemes] = useState<Record<string, any> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getData() {
        const response = await $fetch("themes", { onLoadingChange: setIsLoading })
        const themes_ = await response?.json?.themes
        if (themes_) {
            setThemes(themes_)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return {themes, setThemes, isLoading, setIsLoading}

}