// src/shared/lib/hooks/useInfiniteScroll.ts
import { useEffect, useRef, useState } from "react";

interface UseInfiniteScrollProps<T> {
    fetchData: (page: number) => Promise<T[]>;
    pageSize?: number;
}

export function useInfiniteScroll<T>({ fetchData, pageSize = 12 }: UseInfiniteScrollProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement | null>(null);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextData = await fetchData(page);
            if (nextData.length < pageSize) {
                setHasMore(false);
            }
            setData(prev => [...prev, ...nextData]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error("Infinite scroll error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "100px", threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [isLoading, hasMore]);

    return { data, setData, observerTarget, isLoading, hasMore };
}