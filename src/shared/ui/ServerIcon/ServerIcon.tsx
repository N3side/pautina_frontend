"use client"

import { useEffect, useState } from "react";

const CACHE_KEY = 'svg_cache';
const memoryCache = new Map<string, string>();

// Загружаем кеш из sessionStorage при старте
if (typeof window !== 'undefined') {
    try {
        const saved = sessionStorage.getItem(CACHE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.entries(parsed).forEach(([key, value]) => {
                memoryCache.set(key, value as string);
            });
        }
    } catch (e) {}
}

function saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
        const obj = Object.fromEntries(memoryCache);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch (e) {}
}

interface ServerIconProps {
    url: string;
    className?: string;
}

export default function ServerIcon({ url, className }: ServerIconProps) {
    const [svgHtml, setSvgHtml] = useState<string>(() => {
        return memoryCache.get(url) || "";
    });

    useEffect(() => {
        if (!url) return;
        if (memoryCache.has(url)) {
            const cached = memoryCache.get(url);
            if (cached) setSvgHtml(cached);
            return;
        }

        let isMounted = true;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then((data) => {
                const svgMatch = data.match(/<svg[\s\S]*<\/svg>/);
                if (svgMatch && isMounted) {
                    const svg = svgMatch[0];
                    memoryCache.set(url, svg);
                    saveToStorage(); // Сохраняем в sessionStorage
                    setSvgHtml(svg);
                }
            })
            // .catch(() => console.error("Ошибка загрузки SVG icon", url));

        return () => {
            isMounted = false;
        };
    }, [url]);

    if (!svgHtml) {
        return <div className="w-full h-full rounded bg-white/5 animate-pulse" />;
    }

    return (
        <div
            className={`[&>svg]:w-full [&>svg]:h-full ${className}`}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
    );
}