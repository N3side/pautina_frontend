"use client"

import { useState } from "react";
import { useModal } from "@/shared/lib/hooks/useModal"; // Укажи свой путь
import GalleryModal from "../gallery-modal/GalleryModal";

interface Props {
    gallery: Record<string, any>[] | null
    className?: string
}

export default function Gallery({ gallery, className }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isOpen, open, close } = useModal();

    if (!gallery || gallery.length === 0) return null;

    const sortedGallery = [...gallery].sort((a, b) => a.sort - b.sort);

    const total = sortedGallery.length;

    // Навигация
    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < total - 1) setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const goToSlide = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    return (
        <>
            <div
                className={`w-full mt-4 group/slider relative rounded-[16px] overflow-hidden  max-h-[180px] sm:max-h-[220px] shadow-sm cursor-zoom-in ${className}`}
                onClick={open}
            >
                {/* ... (код трека слайдера оставляем как был) ... */}
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {sortedGallery.map((img, idx) => {
                        const isNear = Math.abs(idx - currentIndex) <= 2;
                        return (
                            <div key={img.id} className="w-full flex-none max-w-full relative h-full">
                                {isNear ? (
                                    <img src={img.image_url} className="w-full h-full object-cover block" draggable="false" />
                                ) : (
                                    <div className="w-full h-full bg-border-default/10" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {total > 1 && (
                    <>
                        {/* Кнопка "Назад" */}
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full glass-effect text-white transition-all duration-200 active:scale-95 ${
                                currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/slider:opacity-100 hover:bg-white/20"
                            }`}
                        >
                            <svg className="w-5 h-5 ml-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Кнопка "Вперед" */}
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex === total - 1}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full glass-effect text-white transition-all duration-200 active:scale-95 ${
                                currentIndex === total - 1 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/slider:opacity-100 hover:bg-white/20"
                            }`}
                        >
                            <svg className="w-5 h-5 mr-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Точки пагинации */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full glass-effect bg-black/20">
                            {sortedGallery.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => goToSlide(e, idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentIndex
                                            ? "bg-white w-4"
                                            : "bg-white/40 hover:bg-white/80 w-1.5"
                                    }`}
                                    aria-label={`Перейти к слайду ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* (Стрелки и Dots - оставляем без изменений) */}
            </div>

            {/* Модальное окно */}
            <GalleryModal
                isOpen={isOpen}
                close={close}
                gallery={sortedGallery}
                initialIndex={currentIndex}
            />
        </>
    );
}