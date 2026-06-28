"use client";

import { Stack, StackSkeleton } from "@/entities/stack/Stack";
import { AsyncCombobox } from "@/shared/ui/AsyncCombobox/AsyncCombobox";
import { useGetStacks } from "@/features/manage-stacks/model/useGetStacks";
import {useIntersectionObserver} from "@/shared/lib/hooks/useIntersectionObserver";

export default function ShowStacks({
       selectedStacks = [],
       setSelectedStacks,
       showSelected = false,
       showAll = false,
       showSearch = false,
       userId,
       isReadOnly = false,
       setCurrentSelectedStack,
       className
   }: any) {
    const {
        stacks,
        searchName,
        setSearchName,
        isInitialLoading,
        isFetchingMore,
        hasMore,
        loadMore
    } = useGetStacks({ userId });

    // Хук для бесконечного скролла
    const observerTarget = useIntersectionObserver(
        loadMore,
        [isInitialLoading, hasMore, stacks.length],
        !isReadOnly && !isInitialLoading && hasMore
    );

    const availableStacks = stacks.filter(
        (stack) => !selectedStacks?.some((selected) => selected.id === stack.id)
    );

    const handleSelect = (stack: any) => {
        setCurrentSelectedStack?.(stack);
        if (isReadOnly || !setSelectedStacks) return;
        if (!selectedStacks?.some((_) => _.id === stack.id)) {
            setSelectedStacks((prev: any) => [...(prev || []), { ...stack, selected: true }]);
        }
    };

    const handleDeleteSelected = (stack: any) => {
        if (isReadOnly || !setSelectedStacks) return;
        setSelectedStacks((prev: any) => (prev || []).filter((_: any) => _.id !== stack.id));
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {showSelected && selectedStacks.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(105px,1fr))] gap-3">
                    {selectedStacks.map((stack: any, i: number) => (
                        <Stack
                            key={stack.id || i}
                            stack={stack}
                            handleDelete={isReadOnly ? undefined : () => handleDeleteSelected(stack)}
                            selected={!isReadOnly}
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
                    options={stacks}
                    isLoading={isInitialLoading || isFetchingMore}
                    onInputChange={(val) => setSearchName(val)}
                    onChange={(item: any) => item && handleSelect(item)}
                    onClear={() => setSearchName("")}
                    emptyState={<div className="p-4 text-center text-text-muted">Стек не найден</div>}
                    showDropdown={false}
                />
            )}

            {showAll && !isReadOnly && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(105px,1fr))] gap-2 overflow-y-scroll max-h-[200px] pr-1 scroll-smooth">
                    {isInitialLoading ? (
                        [...Array(12)].map((_, i) => <StackSkeleton key={`init-skeleton-${i}`} />)
                    ) : (
                        <>
                            {availableStacks.map((stack: any, i: number) => (
                                <Stack
                                    className="cursor-pointer"
                                    key={stack.id || i}
                                    stack={stack}
                                    onClick={() => handleSelect(stack)}
                                />
                            ))}
                            {isFetchingMore && [...Array(8)].map((_, i) => <StackSkeleton key={`more-skeleton-${i}`} />)}
                            <div ref={observerTarget} className="h-2 w-full" />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}