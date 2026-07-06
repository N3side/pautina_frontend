import { useEffect, useRef, useCallback } from "react";

export function useIntersectionObserver(
    callback: () => void,
    deps: any[],
    enabled: boolean
) {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const callbackRef = useRef(callback);

    // Обновляем ref при изменении callback
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!enabled || !targetRef.current) {
            console.log('Observer disabled or no target');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('Intersection detected, calling callback');
                    callbackRef.current();
                }
            },
            { rootMargin: "100px", threshold: 0.01 }
        );

        observer.observe(targetRef.current);
        console.log('Observer attached');

        return () => {
            console.log('Observer disconnected');
            observer.disconnect();
        };
    }, [...deps, enabled]); // Добавили enabled в зависимости

    return targetRef;
}