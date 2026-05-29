"use client"

import { pushable } from "@/shared/styles/animations";
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import CloseIcon from '@mui/icons-material/Close';

export function StackSkeleton() {
    return (
        <div className="px-4 py-3 rounded-lg flex gap-4 items-center bg-border-default/20 animate-pulse w-full">
            <div className="w-[30px] h-[30px] rounded-full bg-border-default/40 flex-shrink-0" />
            <div className="h-5 w-full bg-border-default/40 rounded" />
        </div>
    )
}

interface StackProps {
    stack: Record<string, any>
    handleDelete?: (stack: any) => void
    selected?: boolean
    onClick?: () => void
    isReadOnly?: boolean; // Новый проп для гостевого режима
}

export function Stack({ stack, handleDelete, selected = false, onClick, isReadOnly = false }: StackProps) {
    const isSelected = stack?.selected || selected;

    const onDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (stack && handleDelete) handleDelete(stack);
    };

    // Если это чужой профиль (isReadOnly), то сбрасываем стили выделения до обычного glass-эффекта
    const cardStyles = isReadOnly
        ? 'glass-effect border-white/5 cursor-default'
        : isSelected
            ? 'bg-brand/10 border-brand/40 ring-2 ring-brand ring-offset-2 ring-offset-surface shadow-lg shadow-brand/5 cursor-pointer hover:scale-[1.01]'
            : `glass-effect border-white/5 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-md cursor-pointer ${pushable}`;

    return (
        <div
            onClick={isReadOnly ? undefined : onClick}
            className={`group relative flex items-center gap-3.5 px-4 py-2.5 rounded-xl select-none 
                transition-all duration-200 ease-in-out border ${cardStyles}`}
        >
            <div className={`flex items-center justify-center w-8 h-8 p-1 rounded-lg bg-white/[0.02] border border-white/5 transition-transform duration-200 ${!isReadOnly && 'group-hover:scale-105'}`}>
                <img
                    src={stack?.image_url || stack?.themes?.[0]?.image_url}
                    alt={stack?.name || 'stack'}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                />
            </div>

            <p className="text-text-main font-medium text-[15px] tracking-wide transition-colors">
                {stack?.name}
            </p>

            {/* Крестик появится только если профиль свой И передан обработчик удаления */}
            {!isReadOnly && isSelected && handleDelete && (
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