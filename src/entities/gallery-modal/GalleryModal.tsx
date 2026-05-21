"use client"

import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    close: () => void;
    gallery: any[];
    initialIndex: number;
}

export default function ProjectGalleryModal({ isOpen, close, gallery, initialIndex }: ModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!isOpen) return null;

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < gallery.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={close}
        >
            {/* Кнопка закрытия */}
            <button
                onClick={close}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[101]"
            >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Контейнер изображения */}
            <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                <img
                    src={gallery[currentIndex].image_url}
                    alt="Project"
                    className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-300"
                />

                {/* Кнопки навигации */}
                {currentIndex > 0 && (
                    <button
                        onClick={prev}
                        className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}

                {currentIndex < gallery.length - 1 && (
                    <button
                        onClick={next}
                        className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
            </div>

            {/* Индикатор прогресса */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 font-medium">
                {currentIndex + 1} / {gallery.length}
            </div>
        </div>
    );
}