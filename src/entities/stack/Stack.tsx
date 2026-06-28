"use client"

import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import CloseIcon from '@mui/icons-material/Close';
import ServerIcon from "@/shared/ui/ServerIcon/ServerIcon";

export function StackSkeleton() {
    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] animate-pulse w-full">
            <div className="w-4 h-4 rounded bg-white/10 flex-shrink-0" />
            <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
    )
}

interface Props {
    stack: Record<string, any>
    handleDelete?: (stack: any) => void
    selected?: boolean
    onClick?: () => void
    isReadOnly?: boolean;
    className?: string
}

export function Stack({ stack, handleDelete, selected = false, onClick, isReadOnly = false, className }: Props) {
    const isSelected = stack?.selected || selected;

    const onDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (stack && handleDelete) handleDelete(stack);
    };

    return (
        <div
            onClick={isReadOnly ? undefined : onClick}
            className={`group glass-effect relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border select-none transition-all duration-200 ${className}`}
        >
            <div className="w-4 h-4 flex items-center justify-center">
                <ServerIcon
                    url={stack?.image_url || stack?.themes?.[0]?.image_url}
                    className={`w-full h-full object-contain filter drop-shadow-sm text-text-main transition-transform duration-200 
                        ${!isReadOnly && 'group-hover:scale-105'}`}
                />
            </div>

            <span className="text-text-main font-medium text-[12px] tracking-wide whitespace-nowrap">
                {stack?.name}
            </span>

            {!isReadOnly && isSelected && handleDelete && (
                <RoundedIconWrapper
                    onClick={onDeleteClick}
                    Icon={CloseIcon}
                    className="!w-3.5 !h-3.5 ml-1 bg-white/10 border border-white/10 text-text-muted hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-150 active:scale-95"
                    IconClassName="!text-[9px]"
                />
            )}
        </div>
    )
}