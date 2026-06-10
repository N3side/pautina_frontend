"use client"

import { useEffect, useState } from "react";

interface ServerIconProps {
    url: string;
    className?: string; // Сюда будешь передавать "!text-text-main" или "text-brand"
}

export default function ServerIcon({ url, className }: ServerIconProps) {
    const [svgHtml, setSvgHtml] = useState<string>("");

    useEffect(() => {
        if (!url) return;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then((data) => {
                // Вырезаем сам <svg>...</svg> (убираем лишние XML обертки бэкенда)
                const svgMatch = data.match(/<svg[\s\S]*<\/svg>/);
                if (svgMatch) setSvgHtml(svgMatch[0]);
            })
            .catch(() => console.error("Ошибка загрузки SVG icon"));
    }, [url]);

    if (!svgHtml) {
        // Заглушка, пока качается иконка
        return <div className="w-full h-full rounded bg-white/5 animate-pulse" />;
    }

    return (
        <div
            // text-current заставляет currentColor внутри SVG смотреть на цвет этого дива
            // [&>svg]:fill-current и [&>svg]:stroke-current форсят покраску, если на бэке забыли инлайн-стиль
            className={`[&>svg]:w-full [&>svg]:h-full ${className}`}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
    );
}