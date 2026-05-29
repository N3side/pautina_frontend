"use client"

import {useEffect, useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {pushable} from "@/shared/styles/animations";
import {useThemes} from "@/entities/themes/model/getThemes";
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import CloseIcon from '@mui/icons-material/Close';
import {AsyncCombobox} from "@/shared/ui/AsyncCombobox/AsyncCombobox";


// Скелетон для одного элемента стека
function StacksSkeleton() {
    return (
        <div className="px-4 py-3 rounded-lg flex gap-4 items-center w-fit bg-border-default/20 animate-pulse w-full">
            <div className="w-[30px] h-[30px] rounded-full bg-border-default/40 flex-shrink-0" />
            <div className="h-5 w-full bg-border-default/40 rounded" />
        </div>
    )
}

interface StackProps {
    stack: Record<string, any>
    handleDelete?: (stack: any) => any
    easyStructure?: boolean
    selected?: boolean
    [key: string]: any
}

function Stack({stack, handleDelete, easyStructure=false, selected=false, ...props}: StackProps) {
    const isSelected = (stack?.selected || selected)
    const onDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (stack && handleDelete) handleDelete(stack);
    };

    return (
        <div
            className={`group relative flex items-center gap-3.5 px-4 py-2.5 rounded-xl cursor-pointer select-none select-none 
                transition-all duration-200 ease-in-out border
                ${isSelected
                ? 'bg-brand/10 border-brand/40 ring-2 ring-brand ring-offset-2 ring-offset-surface shadow-lg shadow-brand/5'
                : 'glass-effect border-white/5 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-md'
            } 
                ${pushable}`}
            {...props}
        >

            {/* Контейнер для иконки, чтобы они все были строго одного размера и слегка подсвечивались */}
            <div className="flex items-center justify-center w-8 h-8 p-1 rounded-lg bg-white/[0.02] border border-white/5 group-hover:scale-105 transition-transform duration-200">
                <img
                    src={stack?.image_url || stack?.themes?.[0]?.image_url}
                    alt={stack?.name || 'stack'}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                />
            </div>

            {/* Текст: чуть уменьшил размер до 15px (text-sm) и добавил межбуквенный интервал для аккуратности */}

            <p className="text-text-main font-medium text-[15px] tracking-wide  transition-colors">
                {stack?.name}
            </p>

            {/* Кнопка удаления: добавил плавное появление и анимацию при наведении */}
            {isSelected && (
                <RoundedIconWrapper
                    onClick={onDeleteClick}
                    Icon={CloseIcon}
                    className="!w-5 !h-5 absolute -top-1.5 -right-1.5 shadow-md bg-surface border border-white/10 text-text-main hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-150 active:scale-95"
                    IconClassName="!text-[11px]"
                />
            )}
        </div>
    )
}



interface Props {
    title?: string
    selectedStacks: Record<string, any> | null
    setSelectedStacks: (stacks: Record<string, any> | null) => void
}

export default function GetStacks({ title = "Выбрать стеки", selectedStacks, setSelectedStacks }: Props) {
    const { themes, isLoading: isThemeLoading } = useThemes()

    const [stacks, setStacks] = useState<Record<string, any>[] | null>(null)

    // Лоадеры
    const [isStacksLoading, setIsStacksLoading] = useState<boolean>(true)
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)

    // Поисковый стейт
    const [searchName, setSearchName] = useState<string>("")

    // Стейт для пагинации
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    // Рефы для контроля потока данных и защиты от race conditions
    const isRequesting = useRef<boolean>(false)
    const observerTarget = useRef<HTMLDivElement | null>(null)
    const latestRequest = useRef<{ page: number; name: string }>({ page: 1, name: "" })

    const availableStacks = stacks?.filter(
        (stack) => !selectedStacks?.some((selected) => selected.id === stack.id)
    ) || [];

    async function getStacks(pageToLoad: number, currentSearch: string) {
        // Запоминаем, какой именно запрос сейчас актуален
        latestRequest.current = { page: pageToLoad, name: currentSearch }

        // Блокируем параллельные запросы только для пагинации (page > 1)
        if (pageToLoad > 1 && isRequesting.current) return
        isRequesting.current = true

        if (pageToLoad === 1) setIsStacksLoading(true)
        else setIsFetchingMore(true)

        const response = await $fetch(`stacks?page=${pageToLoad}&name=${encodeURIComponent(currentSearch)}`, {
            onLoadingChange: (loading) => {
                if (!loading) {
                    // Снимаем лоадеры только если этот запрос всё еще актуален
                    if (latestRequest.current.name === currentSearch) {
                        setIsStacksLoading(false)
                        setIsFetchingMore(false)
                    }
                    isRequesting.current = false
                }
            }
        })

        // Проверка на Race Condition: если пользователь уже ввёл другой поисковый запрос, текущий ответ отбрасываем
        if (latestRequest.current.name !== currentSearch) return

        const resData = response?.json
        const stacks_ = resData?.stacks

        if (stacks_) {
            setStacks(prev => pageToLoad === 1 ? stacks_ : [...(prev || []), ...stacks_])
            setHasMore(resData.current_page < resData.last_page)
            setPage(resData.current_page)

        }
    }

    // Эффект дебаунса для ввода текста.
    // Заменяет первоначальный useEffect на mount, так как пустая строка отработает при инициализации.
    useEffect(() => {
        const timeout = setTimeout(() => {
            getStacks(1, searchName)
        }, 350) // Оптимальный таймаут для UX ввода

        return () => clearTimeout(timeout)
    }, [searchName])

    // Intersection Observer для бесконечного скролла
    useEffect(() => {
        if (isStacksLoading || !hasMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isRequesting.current) {
                    getStacks(page + 1, searchName)
                }
            },
            {
                rootMargin: "80px",
                threshold: 0.01
            }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [page, hasMore, isStacksLoading, searchName]) // Добавили searchName в зависимости

    function handleSelect(stack) {
        const found = selectedStacks?.find(_ => _.id === stack.id)
        if (!found) {
            setSelectedStacks(prev => [...(prev || []), { ...stack, selected: true }])
        }
    }

    function handleDeleteSelected(stack) {
        const updated = selectedStacks?.filter(_ => _.id !== stack.id) || []
        setSelectedStacks(updated)
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Выбранные стеки */}
            {selectedStacks && Array.isArray(selectedStacks) && selectedStacks.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                    {selectedStacks.map((stack, i) => (
                        <Stack
                            stack={stack}
                            key={stack.id || i}
                            handleDelete={handleDeleteSelected}
                            easyStructure={true}
                            selected={true}
                        />
                    ))}
                </div>
            )}

            <p className="text-text-main font-bold text-large">{title}</p>

            {/* Интегрированный Shared-компонент фильтрации */}
            <AsyncCombobox
                placeholder="Поиск стеков (например: React)..."
                inputValue={searchName}
                selectedOption={null} // Передаем null, так как это множественный выбор через сетку карт
                // @ts-ignore
                options={stacks || []}
                isLoading={isStacksLoading || isFetchingMore}
                onInputChange={(val) => setSearchName(val)}
                onChange={(item) => {
                    if (item) handleSelect(item);
                }}
                onClear={() => setSearchName("")}
                emptyState={
                    <div className="p-4 text-center text-text-muted">
                        Стек <span className="font-medium text-text-main">{searchName}</span> не найден
                    </div>
                }
                showDropdown={false}
            />

            {/* Блок Стеки с бесконечным скроллом */}
            {/* Блок Стеки с бесконечным скроллом */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 overflow-y-scroll max-h-[200px] pr-1 scroll-smooth">
                {!isStacksLoading && stacks && Array.isArray(stacks) ? (
                    <>
                        {/* ИЗМЕНЕНО: Рендерим availableStacks вместо stacks */}
                        {availableStacks.map((stack, i) => (
                            <Stack
                                stack={stack}
                                key={stack.id || i}
                                onClick={() => handleSelect(stack)}
                            />
                        ))}

                        {/* ИЗМЕНЕНО: Показываем пустой стейт, только если отфильтрованный список пуст и страниц больше нет */}
                        {availableStacks.length === 0 && !hasMore && !isFetchingMore && (
                            <div className="col-span-full py-8 text-center text-text-muted text-sm">
                                {searchName ? (
                                    <span>Стек <span className="font-semibold text-text-main">"{searchName}"</span> не найден</span>
                                ) : (
                                    "Все доступные стеки уже выбраны"
                                )}
                            </div>
                        )}

                        {/* Скелетоны при ДОЗАГРУЗКЕ страницы */}
                        {isFetchingMore &&
                            [...Array(20)].map((_, i) => <StacksSkeleton key={`more-skeleton-${i}`} />)
                        }

                        {hasMore && (
                            <div ref={observerTarget} className="col-span-full h-2 w-full clear-both" />
                        )}
                    </>
                ) : (
                    // Скелетоны при ПЕРВОЙ загрузке / Новом поиске
                    [...Array(20)].map((_, i) => <StacksSkeleton key={`init-skeleton-${i}`} />)
                )}
            </div>
        </div>
    )
}