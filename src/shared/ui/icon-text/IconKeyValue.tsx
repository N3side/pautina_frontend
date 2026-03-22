"use client"

import React, { HTMLAttributes, useState } from "react";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {copyToClipboard} from "@/shared/lib/utils/copyToClipboard";

interface Props extends HTMLAttributes<HTMLDivElement> {
    Icon: any
    k?: string
    v: string
    className?: string
    shouldCopy?: boolean
    onCopy?: (value: any) => void;
}

export default function IconKeyValue({ Icon, k, v, className, onCopy, shouldCopy=false, ...props }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <div
            className={`relative cursor-pointer group flex gap-3 items-center transition-all ${className}`}
            {...props}
            onMouseEnter={shouldCopy ? () => setIsHovered(true) : () => {}}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowSuccess(false);
            }}
            onClick={shouldCopy ? () => copyToClipboard({text: v, message: "успешно скопировано"}) : () => {}}
        >
            {/* Обертка для иконки с анимацией смены */}
            <div className="relative flex items-center justify-center w-5 h-5 overflow-hidden">
                {/* Основная иконка */}
                <Icon
                    className={`
                        text-text-muted !text-[20px] absolute transition-all duration-300
                        ${isHovered ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'}
                    `}
                />

                {/* Иконка копирования/успеха */}
                <div className={`
                    absolute transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                `}>
                    {showSuccess ? (
                        <CheckRoundedIcon className="!text-[18px] text-green-main" />
                    ) : (
                        <ContentCopyRoundedIcon className="!text-[18px] text-brand" />
                    )}
                </div>
            </div>

            <div className="flex flex-col">
                {k && (
                    <p className="text-tiny uppercase tracking-wider text-text-muted/70 font-bold leading-none mb-0.5">
                        {k}:
                    </p>
                )}
                <p className={`text-small font-semibold transition-colors ${showSuccess ? 'text-green-main' : 'text-text-main'}`}>
                    {v}
                </p>
            </div>

            {/* Подсказка (Tooltip) */}
            {isHovered && (
                <div className={`
                    absolute left-0 -top-8 px-2 py-1 
                    bg-glass-bg backdrop-blur-md border border-glass-border 
                    rounded-md text-[10px] font-bold uppercase tracking-tighter
                    transition-all duration-200 shadow-xl z-10
                    ${showSuccess ? 'text-green-main border-green-main/30' : 'text-text-muted'}
                `}>
                    {showSuccess ? "Скопировано!" : "Нажми, чтобы скопировать"}
                </div>
            )}
        </div>
    );
}