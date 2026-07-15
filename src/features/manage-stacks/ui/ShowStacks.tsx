"use client";

import { Stack, StackSkeleton } from "@/entities/stack/Stack";
import { AsyncCombobox } from "@/shared/ui/AsyncCombobox/AsyncCombobox";
import { useGetStacks } from "@/features/manage-stacks/model/useGetStacks";
import {useIntersectionObserver} from "@/shared/lib/hooks/useIntersectionObserver";
import {useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {useTypes} from "@/entities/types/model/useTypes";

interface Props {
    selectedStacks?: Record<string, any>[]
    setSelectedStacks?: (any) => void
    showSelected?: boolean
    showAll?: boolean
    showSearch?: boolean
    userId?: string
    isReadOnly?: boolean
    setCurrentSelectedStack?: (any) => void
    className?: string
    baseUrl: string
}

export default function ShowStacks({
                                       selectedStacks = [],
                                       setSelectedStacks,
                                       showSelected = false,
                                       showAll = false,
                                       showSearch = false,
                                       userId,
                                       isReadOnly = false,
                                       setCurrentSelectedStack,
                                       className,
                                       baseUrl
                                   }: Props) {
    const {
        stacks,
        searchName,
        setSearchName,
        isInitialLoading,
        isFetchingMore,
        hasMore,
        loadMore
    } = useGetStacks({ userId, baseUrl });

    const {types} = useTypes()

    const observerTarget = useIntersectionObserver(
        loadMore,
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

    // Получаем имя типа по id
    const getTypeName = (typeId: string) => {
        if (!typeId) return 'Другое';
        const type = types.find(t => t.id === typeId);
        return type?.name || typeId;
    };

    // Группировка стеков по type_id (только для НЕ редактируемого режима)
    const groupedStacks = isReadOnly ? selectedStacks.reduce((acc, stack) => {
        const typeId = stack.type_id || 'other';
        if (!acc[typeId]) {
            acc[typeId] = [];
        }
        acc[typeId].push(stack);
        return acc;
    }, {} as Record<string, any[]>) : null;

    const sortedGroupKeys = groupedStacks
        ? Object.keys(groupedStacks).sort((a, b) => {
            return getTypeName(a).localeCompare(getTypeName(b));
        })
        : [];

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {showSelected && selectedStacks.length > 0 && (
                <>
                    {isReadOnly ? (
                        // Не редактируемый режим - группировка по типам
                        <div className="flex flex-col gap-4">
                            {sortedGroupKeys.map((typeId) => (
                                <div key={typeId} className="flex flex-col gap-2">
                                    <p className="text-text-muted text-tiny font-semibold uppercase tracking-wider">
                                        {getTypeName(typeId)}
                                    </p>
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(105px,1fr))] gap-2">
                                        {groupedStacks && groupedStacks[typeId].map((stack: any, i: number) => (
                                            <Stack
                                                key={stack.id || i}
                                                stack={stack}
                                                isReadOnly={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Редактируемый режим - сетка без группировки
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(105px,1fr))] gap-2">
                            {selectedStacks.map((stack: any, i: number) => (
                                <Stack
                                    key={stack.id || i}
                                    stack={stack}
                                    handleDelete={() => handleDeleteSelected(stack)}
                                    selected={!isReadOnly}
                                    isReadOnly={isReadOnly}
                                />
                            ))}
                        </div>
                    )}
                </>
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
                <div className="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-2 overflow-y-scroll max-h-[130px] pr-1 scroll-smooth mt-2">
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