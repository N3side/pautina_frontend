"use client";

import { ComponentProps } from "react";
import { motion } from "framer-motion";

interface IconProps extends ComponentProps<"svg"> {
    fontSize?: "small" | "medium" | "large";
}

export function HeartFilledIcon({ className, fontSize, ...props }: IconProps) {
    return (
        // Делаем motion.svg вместо обычного svg
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            // Добавили text-red-500 для цвета по умолчанию
            className={`w-5 h-5 text-red-500 overflow-visible ${className || ""}`}

            // Настройки анимации перенесли сюда!
            style={{ transformOrigin: "center" }} // Для всего SVG center работает идеально
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 450,
                damping: 14,
            }}
            {...(props as any)} // Прокидываем пропсы (as any спасает от конфликта типов motion и svg)
        >
            {/* А контур оставляем самым обычным, статичным */}
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
    );
}