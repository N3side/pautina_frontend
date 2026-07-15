import { useEffect, useRef } from "react";

export function useIntersectionObserver(
    callback: () => void,
    enabled: boolean
) {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!enabled) return;

        const target = targetRef.current;

        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callbackRef.current();
                }
            },
            {
                rootMargin: "100px",
                threshold: 0.01,
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [enabled]);

    return targetRef;
}