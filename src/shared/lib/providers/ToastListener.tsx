import { useToasterStore } from 'react-hot-toast';
import { playSound } from "@/shared/lib/utils/playSound";
import { useEffect, useRef } from "react";

export const ToastListener = ({ children }) => {
    const { toasts } = useToasterStore();
    // Храним набор ID, которые уже озвучили
    const playedToasts = useRef(new Set<string>());

    useEffect(() => {
        toasts.forEach((t) => {
            // Если тост виден и его ID еще нет в нашем списке "проигранных"
            if (t.visible && !playedToasts.current.has(t.id)) {
                playedToasts.current.add(t.id);
                playSound();
            }
        });

        // Опционально: очистка старых ID из Set, чтобы память не текла
        // (хотя ID тостов обычно немного, это хорошая практика)
        if (toasts.length === 0 && playedToasts.current.size > 0) {
            playedToasts.current.clear();
        }
    }, [toasts]);

    return children;
};