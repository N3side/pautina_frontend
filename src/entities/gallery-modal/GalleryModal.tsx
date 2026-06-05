"use client"

import { useState, useEffect } from "react";
import {createPortal} from "react-dom";
import {create} from "zustand";

interface ModalProps {
    isOpen: boolean;
    close: () => void;
    gallery: any[];
    initialIndex: number;
}

export default function ProjectGalleryModal({ isOpen, close, gallery, initialIndex }: ModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // КРИТИЧЕСКИЙ ФИКС: Синхронизируем индекс при каждом открытии модалки
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            // Блокируем скролл страницы, пока открыта полноэкранная галерея
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, initialIndex]);

    if (!isOpen) return null;

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < gallery.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return createPortal(
        <div
            // fixed inset-0 и самый высокий z-индекс гарантируют экран "как в телеге"
            className="fixed inset-0 !z-[999999] flex flex-col items-center justify-center bg-neutral-950/95 backdrop-blur-xl"
            onClick={close}
        >
            {/* Кнопка закрытия сверху справа */}
            <button
                onClick={close}
                className="absolute top-6 right-6 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-[1000000]"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Главный контейнер фото */}
            <div
                className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={gallery[currentIndex]?.image_url}
                    alt="Увеличенное изображение проекта"
                    className="max-w-full max-h-full object-contain select-none rounded-lg shadow-2xl transition-all duration-300 animate-in zoom-in-95 ease-out"
                    draggable="false"
                />

                {/* Стрелка Назад */}
                {currentIndex > 0 && (
                    <button
                        onClick={prev}
                        className="absolute left-4 p-4 rounded-full bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 text-white transition-all backdrop-blur-md shadow-lg"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Стрелка Вперед */}
                {currentIndex < gallery.length - 1 && (
                    <button
                        onClick={next}
                        className="absolute right-4 p-4 rounded-full bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 text-white transition-all backdrop-blur-md shadow-lg"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Счётчик страниц снизу */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm font-medium tracking-wider select-none">
                {currentIndex + 1} / {gallery.length}
            </div>
        </div>,
        document.body
    )
}