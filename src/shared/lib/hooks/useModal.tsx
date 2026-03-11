"use client"

import {useContext, useEffect, useState} from "react"
import {BodyBlockContext} from "@/shared/lib/providers/BodyBlockProvider"

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