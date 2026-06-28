"use client";

import { useEffect, useRef, useState } from "react";
import { $fetch } from "@/shared/api/fetch";

interface UseIntersectionViewProps {
    entityId: string;
    entityType: string;
    threshold?: number;
    delay?: number;
    initialViewed?: boolean;
}

export function useIntersectionView({
        entityId,
        entityType,
        threshold = 0.5,
        delay = 1000,
        initialViewed = false
    }: UseIntersectionViewProps) {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isViewed, setIsViewed] = useState(initialViewed);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Твоя функция отправки просмотра
    async function sendView(entity: string, entity_id: string) {
        await $fetch("view", {
            method: "POST",
            body: JSON.stringify({
                "entity": entity,
                "entity_id": entity_id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    useEffect(() => {
        if (isViewed || !targetRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Запускаем таймер: если элемент в зоне видимости дольше delay
                    timerRef.current = setTimeout(() => {
                        sendView(entityType, entityId).then(() => {
                            setIsViewed(true);
                        });
                    }, delay);
                } else {
                    // Если ушел из зоны видимости раньше времени — чистим таймер
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }
                }
            },
            { threshold }
        );

        observer.observe(targetRef.current);

        return () => {
            observer.disconnect();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isViewed, entityId, entityType, threshold, delay]);

    return { targetRef };
}