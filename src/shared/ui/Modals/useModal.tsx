"use client"

import {useContext, useEffect, useState} from "react"
import {BodyBlockContext} from "@/shared/lib/providers/BodyBlockProvider"

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const bg = `fixed z-[1301] flex flex-col outline-none glass-effect`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`

export function useModal() {

    const [isOpen, setIsOpen] = useState(false);
    const { setIsBlocked } = useContext(BodyBlockContext)

    useEffect(() => {
        setIsBlocked(isOpen)
    }, [isOpen, setIsBlocked])

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close};
}