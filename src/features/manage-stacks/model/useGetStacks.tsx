import { useState, useEffect, useRef } from "react";
import { $fetch } from "@/shared/api/fetch";

interface UseGetStacksProps {
    userId?: number | string;
    baseUrl: string
}

export function useGetStacks({ userId, baseUrl }: UseGetStacksProps) {
    const [stacks, setStacks] = useState<Record<string, any>[]>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const isRequesting = useRef<boolean>(false);
    const latestSearch = useRef<string>("");
    const abortControllerRef = useRef<AbortController | null>(null);

    async function fetchStacks(pageToLoad: number, currentSearch: string) {
        // Отменяем предыдущий запрос, если он был
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        if (isRequesting.current) return;
        isRequesting.current = true;
        latestSearch.current = currentSearch;

        if (pageToLoad === 1) {
            setIsInitialLoading(true);
        } else {
            setIsFetchingMore(true);
        }

        try {
            const response = await $fetch(
                `${baseUrl}?page=${pageToLoad}&name=${encodeURIComponent(currentSearch)}`,
                {
                    onLoadingChange: (loading) => {
                        if (!loading) {
                            if (latestSearch.current === currentSearch) {
                                setIsInitialLoading(false);
                                setIsFetchingMore(false);
                            }
                            isRequesting.current = false;
                        }
                    },
                    signal: controller.signal // Передаем сигнал для отмены
                }
            );

            if (latestSearch.current !== currentSearch) return;

            const resData = response?.json;
            const newStacks = resData?.data || resData?.stacks || [];

            setStacks(prev => pageToLoad === 1 ? newStacks : [...prev, ...newStacks]);

            // Проверяем пагинацию
            const currentPage = resData?.current_page || pageToLoad;
            const lastPage = resData?.last_page || 1;
            const hasMoreData = currentPage < lastPage;

            setHasMore(hasMoreData);
            setPage(currentPage);

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Request cancelled');
                return;
            }
            console.error('Fetch stacks error:', error);
            setIsInitialLoading(false);
            setIsFetchingMore(false);
            isRequesting.current = false;
        }
    }

    // Сброс при смене userId
    useEffect(() => {
        setStacks([]);
        setPage(1);
        setHasMore(true);
        setIsInitialLoading(true);
        fetchStacks(1, searchName);
    }, [userId]);

    // Дебаунс для поиска
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setStacks([]);
            setPage(1);
            setHasMore(true);
            setIsInitialLoading(true);
            fetchStacks(1, searchName);
        }, 300);

        return () => {
            clearTimeout(delayDebounceFn);
            // Отменяем запрос при размонтировании или новом поиске
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [searchName]);

    const loadMore = () => {
        console.log('loadMore called', { isRequesting: isRequesting.current, hasMore, page });
        if (!isRequesting.current && hasMore) {
            fetchStacks(page + 1, searchName);
        }
    };

    return {
        stacks,
        searchName,
        setSearchName,
        isInitialLoading,
        isFetchingMore,
        hasMore,
        loadMore,
        page
    };
}