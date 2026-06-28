import { useEffect, useRef } from "react";

export function useIntersectionObserver(
    callback: () => void,
    deps: any[],
    enabled: boolean
) {
    const targetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!enabled || !targetRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) callback();
            },
            { rootMargin: "100px", threshold: 0.01 }
        );

        observer.observe(targetRef.current);
        return () => observer.disconnect();
    }, deps);

    return targetRef;
}