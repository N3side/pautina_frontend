"use client"

import {ReactNode, useState} from "react"
import {Drawer} from "vaul" // Импортируем Vaul
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Close} from "@/shared/assets/images/vector/Close"

// Утилита для удобного объединения классов (можно вынести в отдельный файл lib/utils)
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface UseModalProps {
    children: ReactNode;
    modalClassName?: string;
    sheetClassName?: string;
    onClose?: () => void;
}

export function useModal({
         children,
         modalClassName = "",
         sheetClassName = "",
         onClose = () => {}
     }: UseModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);

    // Vaul управляет состоянием сам, но нам нужно синхронизировать закрытие
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            onClose();
        }
    };


    const close = () => handleOpenChange(false);

    const modal = (
        <Drawer.Root
            open={isOpen}
            onOpenChange={handleOpenChange}
            shouldScaleBackground={true} // Можно включить эффект отдаления фона как в iOS
        >
            <Drawer.Portal>
                {/* Overlay (затемнение фона) */}
                <Drawer.Overlay className="fixed inset-0 !w-full z-[1300] backdrop-blur-[2px] !w-full" />

                {/* Content Wrapper */}
                <Drawer.Content
                    className={cn(
                        // Базовые стили (Mobile Bottom Sheet)
                        "fixed bottom-0 left-0 right-0 z-[1301] flex flex-col rounded-t-[24px] outline-none",
                        "max-h-[95vh] h-full",

                        // Glass Effect & Colors
                        "glass-effect !text-text-main",

                        "!after-hidden",

                        // Desktop Adaptation (Центрирование как Modal)
                        "md:bottom-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-1/2",
                        "md:max-w-[900px] w-full md:rounded-[24px] md:h-[740px]",

                        sheetClassName
                    )}
                >
                    {/* Header Area */}
                    <div className="relative pt-4 flex-shrink-0">
                        {/* Mobile Puller (Ручка) */}
                        <div className="md:hidden w-full h-[30px] flex items-start justify-center cursor-grab touch-none" aria-hidden="true">
                            <div className="w-12 h-[5px] bg-[var(--border-default)] rounded-full bg-gray-300" />
                        </div>

                        {/* Desktop Close Button */}
                        <div className="hidden md:block absolute top-[15] bg-text-main/10 rounded-full right-[-40]">
                            <button
                                onClick={close}
                                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-2 rounded-full hover:bg-black/5"
                            >
                                <Close />
                            </button>
                        </div>

                    </div>

                    {/* Content Area */}
                    <div
                        className={cn(
                            "overflow-y-auto custom-scrollbar px-4 pb-8 pt-2 md:px-8",
                            modalClassName
                        )}
                    >
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );

    return {
        isOpen,
        open,
        close,
        modal,
    };
}