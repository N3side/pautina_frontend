"use client"

import { ReactNode, useContext, useEffect, useState } from "react"
import { BodyBlockContext } from "@/shared/lib/providers/BodyBlockProvider"
import {useMediaQuery} from "@mui/material";
import Mobile from "@/shared/ui/Modals/Mobile";
import {createPortal} from "react-dom";
import Desktop from "@/shared/ui/Modals/Desktop";

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const bg = `fixed z-[1301] flex flex-col outline-none glass-effect`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`

interface UseModalProps {
    children: ReactNode;
    modalClassName?: string;
    sheetClassName?: string;
    onClose?: () => void;
}

export function useModal({
         children,
         modalClassName,
         sheetClassName,
         onClose
     }: UseModalProps) {

    const [isOpen, setIsOpen] = useState(false);
    const { setIsBlocked } = useContext(BodyBlockContext)

    useEffect(() => {
        setIsBlocked(isOpen)
    }, [isOpen, setIsBlocked])

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const matches = useMediaQuery(`(max-width: 968px)`)

    const handleOpenChange = () => {
        setIsOpen(!isOpen);
        if (!open && onClose) onClose();
    }

    const modal = isOpen ?
        createPortal(
            matches ?
                <Mobile
                    isOpen={isOpen}
                    handleOpenChange={handleOpenChange} // Передаем onClose, а не handleOpenChange
                    modalClassName={modalClassName}
                    sheetClassName={sheetClassName}
                >
                    {children}
                </Mobile >
                :
                <Desktop
                    isOpen={isOpen}
                    handleOpenChange={handleOpenChange} // Добавляем onClose в Desktop
                    modalClassName={modalClassName}
                >
                    {children}
                </Desktop >
            , document.body
        ) : null

    return { isOpen, open, close, modal };
}