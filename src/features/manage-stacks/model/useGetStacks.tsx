import { useState, useEffect, useRef } from "react";
import { $fetch } from "@/shared/api/fetch";

interface UseGetStacksProps {
    userId?: number | string; // Передаем, если нужны стеки конкретного юзера
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

    async function fetchStacks(pageToLoad: number, currentSearch: string) {
        if (pageToLoad > 1 && isRequesting.current) return;

        isRequesting.current = true;
        latestSearch.current = currentSearch;

        if (pageToLoad === 1) setIsInitialLoading(true);
        else setIsFetchingMore(true);

        const response = await $fetch(`${baseUrl}?page=${pageToLoad}&name=${encodeURIComponent(currentSearch)}`, {
            onLoadingChange: (loading) => {
                if (!loading) {
                    if (latestSearch.current === currentSearch) {
                        setIsInitialLoading(false);
                        setIsFetchingMore(false);
                    }
                    isRequesting.current = false;
                }
            }
        });

        if (latestSearch.current !== currentSearch) return;

        const resData = response?.json;
        const newStacks = resData?.stacks || [];

        if (newStacks) {
            setStacks(prev => pageToLoad === 1 ? newStacks : [...prev, ...newStacks]);
            setHasMore(resData.current_page < resData.last_page);
            setPage(resData.current_page);
        }
    }

    // Эффект для обработки ввода поиска с Дебаунсом (300мс)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStacks(1, searchName);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchName, userId]); // Добавили userId в зависимости на случай изменения контекста

    const loadMore = () => {
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
        page // Возвращаем для синхронизации обсервера
    };
}