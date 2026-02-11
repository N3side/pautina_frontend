"use client"

import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";

export function useSources() {

    const [sources, setSources] = useState<Record<string, any>>([{}]);

    useEffect(() => {
        // Асинхронная логика внутри эффекта
        const load = async () => {
            const response = await $fetch("sources");
            const sources_ = response?.json?.sources;
            if (sources_) {
                setSources(sources_);
            }
        };

        load();
    }, []); // Пустой массив = выполнится один раз при загрузке

    return { sources }
}