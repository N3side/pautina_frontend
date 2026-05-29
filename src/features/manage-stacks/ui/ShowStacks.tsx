"use client"

import { useEffect, useRef } from "react";
import { Stack, StackSkeleton } from "@/entities/stack/Stack";
import { AsyncCombobox } from "@/shared/ui/AsyncCombobox/AsyncCombobox";
import { useGetStacks } from "@/features/manage-stacks/model/useGetStacks";

interface ShowStacksProps {
    title?: string;
    selectedStacks?: Record<string, any>[];
    setSelectedStacks?: React.Dispatch<React.SetStateAction<Record<string, any>[] | null>>;
    showSelected?: boolean;
    showAll?: boolean;
    showSearch?: boolean;
    userId?: number | string;
    isReadOnly?: boolean; // Новый проп
    setCurrentSelectedStack?: (any) => void
}

export default function ShowStacks({
       selectedStacks = [],
       setSelectedStacks,
       showSelected = false,
       showAll = false,
       showSearch = false,
       userId,
       isReadOnly = false, // По умолчанию false
       setCurrentSelectedStack
   }: ShowStacksProps) {

    const {
        stacks,
        searchName,
        setSearchName,
        isInitialLoading,
        isFetchingMore,
        hasMore,
        loadMore,
        page
    } = useGetStacks({ userId });

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const availableStacks = stacks.filter(
        (stack) => !selectedStacks?.some((selected) => selected.id === stack.id)
    );

    const handleSelect = (stack: any) => {
        setCurrentSelectedStack && setCurrentSelectedStack(stack)
        if (isReadOnly || !setSelectedStacks) return;
        const found = selectedStacks?.some(_ => _.id === stack.id);
        if (!found) {
            setSelectedStacks(prev => [...(prev || []), { ...stack, selected: true }]);
        }
    };

    const handleDeleteSelected = (stack: any) => {
        if (isReadOnly || !setSelectedStacks) return;
        setSelectedStacks(prev => (prev || []).filter(_ => _.id !== stack.id));
    };

    useEffect(() => {
        if (isReadOnly || isInitialLoading || !hasMore || !observerTarget.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "100px", threshold: 0.01 }
        );

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [isInitialLoading, hasMore, stacks.length, page, isReadOnly]);

    return (
        <div className="flex flex-col gap-6">
            {showSelected && selectedStacks.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                    {selectedStacks.map((stack, i) => (
                        <Stack
                            key={stack.id || i}
                            stack={stack}
                            // Если режим просмотра, делит не передаем вообще
                            handleDelete={isReadOnly ? undefined : handleDeleteSelected}
                            selected={!isReadOnly} // Если ReadOnly, не красим в бренд-цвет
                            isReadOnly={isReadOnly}
                        />
                    ))}
                </div>
            )}

            {showSearch && !isReadOnly && (
                <AsyncCombobox
                    placeholder="Поиск стеков..."
                    inputValue={searchName}
                    selectedOption={null}
                    // @ts-ignore
                    options={stacks}
                    isLoading={isInitialLoading || isFetchingMore}
                    onInputChange={(val) => setSearchName(val)}
                    onChange={(item) => item && handleSelect(item)}
                    onClear={() => setSearchName("")}
                    emptyState={<div className="p-4 text-center text-text-muted">Стек не найден</div>}
                    showDropdown={false}
                />
            )}

            {showAll && !isReadOnly && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 overflow-y-scroll max-h-[200px] pr-1 scroll-smooth">
                    {!isInitialLoading ? (
                        <>
                            {availableStacks.map((stack, i) => (
                                <Stack key={stack.id || i} stack={stack} onClick={() => handleSelect(stack)} />
                            ))}

                            {availableStacks.length === 0 && !hasMore && !isFetchingMore && (
                                <div className="col-span-full py-8 text-center text-text-muted text-sm">
                                    {searchName ? "Ничего не найдено" : "Все доступные стеки уже выбраны"}
                                </div>
                            )}

                            {isFetchingMore && [...Array(8)].map((_, i) => <StackSkeleton key={`more-skeleton-${i}`} />)}
                            {hasMore && <div ref={observerTarget} className="col-span-full h-2 w-full" />}
                        </>
                    ) : [...Array(12)].map((_, i) => <StackSkeleton key={`init-skeleton-${i}`} />)}
                </div>
            )}
        </div>
    );
}