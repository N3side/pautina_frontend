"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export const DraggableWrapper = ({ children }) => {
    // Создаем референс, чтобы понимать, было ли движение
    const isDragging = useRef(false);

    return (
        <motion.div
            drag
            dragMomentum={false}
            // Устанавливаем порог: драг начнется только если протащить больше 5px
            // Это помогает отличить случайную дрожь руки от намеренного перетаскивания
            dragElastic={0}

            // События для отслеживания состояния драга
            onDragStart={() => {
                isDragging.current = true;
            }}
            onDragEnd={() => {
                // Небольшая задержка, чтобы onClick не перехватил событие мгновенно
                setTimeout(() => {
                    isDragging.current = false;
                }, 100);
            }}

            style={{
                position: "fixed",
                left: "50%",
                bottom: "2rem",
                x: "-50%",
                zIndex: 1000,
                cursor: "grab",
                width: "fit-content",
                touchAction: "none", // Предотвращает скролл страницы при драге
            }}
            whileTap={{ cursor: "grabbing" }}
        >
            {/* Оборачиваем содержимое, чтобы перехватывать клик */}
            <div
                onClickCapture={(e) => {
                    // Если сейчас идет драг или он только что закончился — блокируем клик
                    if (isDragging.current) {
                        e.stopPropagation();
                    }
                }}
            >
                {children}
            </div>
        </motion.div>
    );
};