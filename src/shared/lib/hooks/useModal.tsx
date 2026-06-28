"use client";

import { useContext, useEffect, useState } from "react";
import { BodyBlockContext } from "@/shared/lib/providers/BodyBlockProvider";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { block, unblock } = useContext(BodyBlockContext);

    useEffect(() => {
        // Мы вызываем block ТОЛЬКО при открытии
        if (isOpen) {
            block();
        }

        // Мы вызываем unblock ТОЛЬКО при размонтировании
        // ИЛИ при переключении isOpen в false
        return () => {
            if (isOpen) {
                unblock();
            }
        };
    }, [isOpen]); // block и unblock стабильны, их можно не указывать

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    };
}