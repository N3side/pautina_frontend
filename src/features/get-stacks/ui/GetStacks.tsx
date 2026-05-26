"use client"

import { useEffect, useState } from "react";
import { $fetch } from "@/shared/api/fetch";
import { WheelXScrollProvider } from "@/shared/ui/WheelScrollXWrapper/WheelScrollXWrapper";
import { pushable } from "@/shared/styles/animations";
import {useThemes} from "@/entities/themes/model/getThemes";
import toast from "react-hot-toast";
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import CloseIcon from '@mui/icons-material/Close';

// Скелетон для одной плашки темы (теперь без дублирования заголовка)
function ThemePillSkeleton() {
    return (
        <div className="px-3 py-2 rounded-lg bg-border-default/20 animate-pulse">
            <div className="h-4 w-20 bg-border-default/40 rounded" />
        </div>
    )
}

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
    handleDelete?: (stack) => any
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
            <p className="text-text-main font-medium text-[15px] tracking-wide group-hover:text-white transition-colors">
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

export default function GetStacks({title="Выбрать стеки", selectedStacks, setSelectedStacks}: Props) {
    const {themes, isLoading: isThemeLoading} = useThemes()

    const [stacks, setStacks] = useState<Record<string, any>[] | null>(null)
    const [isStacksLoading, setIsStacksLoading] = useState<boolean>(true)

    async function getStacks() {
        const response = await $fetch("stacks", { onLoadingChange: setIsStacksLoading })
        const stacks_ = await response?.json?.stacks
        if (stacks_) {
            setStacks(stacks_)
        }
    }

    function handleSelect(stack) {
        const found = selectedStacks?.find(_ => _.id === stack.id)
        if (!found) {
            setSelectedStacks(prev => [...prev, {...stack, selected: true}])
        }
    }

    function handleDeleteSelected(stack) {
        const stacks = selectedStacks?.filter(_ => _.id !== stack.id)
        setSelectedStacks(stacks)
    }

    useEffect(() => {
        getStacks()
    }, []);

    return (
        <div className="flex flex-col gap-6">

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                {
                    selectedStacks && Array.isArray(selectedStacks) && selectedStacks.length > 0 && selectedStacks.map((stack, i) =>
                        <Stack
                            stack={stack}
                            key={i}
                            handleDelete={handleDeleteSelected}
                            easyStructure={true}
                            selected={true}
                        />)
                }
            </div>

            {/* Блок Темы */}
            <div className="flex flex-col gap-2">
                <p className="text-text-main font-bold text-large">{title}</p>
                <WheelXScrollProvider>
                    <div className="flex gap-2">
                        {!isThemeLoading && themes && Array.isArray(themes)
                            ? themes.map((theme, i) => (
                                <div
                                    className={`cursor-pointer px-3 py-2 glass-effect rounded-lg ${pushable}`}
                                     key={i}
                                     onClick={() => toast.success("Кастомизация профиля в разработке")}
                                >
                                    <p className="text-text-main font-medium text-[12px]">{theme?.name}</p>
                                </div>
                            ))
                            : [...Array(6)].map((_, i) => <ThemePillSkeleton key={i} />)
                        }
                    </div>
                </WheelXScrollProvider>
            </div>

            {/* Блок Стеки */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {!isStacksLoading && stacks && Array.isArray(stacks)
                    ? stacks.map((stack, i) => (
                        <Stack
                            stack={stack}
                            key={i}
                            onClick={() => {
                                handleSelect(stack)
                            }}
                        />
                    ))
                    : [...Array(15)].map((_, i) => <StacksSkeleton key={i} />)
                }
            </div>
        </div>
    )
}