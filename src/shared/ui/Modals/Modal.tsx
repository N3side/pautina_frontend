"use client"

import {useMediaQuery} from "@mui/material";
import Mobile from "@/shared/ui/Modals/Mobile";
import {createPortal} from "react-dom";
import Desktop from "@/shared/ui/Modals/Desktop";
import {ReactNode} from "react";

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const bg = `fixed z-[1301] flex flex-col outline-none glass-effect`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`



interface Props {
    children?: ReactNode
    modalClassName?: string
    sheetClassName?: string
    isOpen: boolean
    close: () => void
}

export function Modal({
     children,
     modalClassName,
     sheetClassName,
     isOpen,
     close
 }: Props) {

    const matches = useMediaQuery(`(max-width: 968px)`)

    const modal = isOpen ?
        createPortal(
            matches ?
                <Mobile
                    isOpen={isOpen}
                    modalClassName={modalClassName}
                    sheetClassName={sheetClassName}
                    close={close}
                >
                    {children}
                </Mobile >
                :
                <Desktop
                    isOpen={isOpen}
                    modalClassName={modalClassName}
                    close={close}
                >
                    {children}
                </Desktop >
            , document.body
        ) : null

    return modal
}