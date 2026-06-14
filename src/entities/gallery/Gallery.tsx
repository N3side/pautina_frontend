"use client"

import { useState, useEffect, useRef } from "react";
import { useModal } from "@/shared/lib/hooks/useModal";
import GalleryModal from "../gallery-modal/GalleryModal";

interface Props {
    gallery: Record<string, any>[] | null
    className?: string
    timer?: number
    autoFlip?: boolean
}

export default function Gallery({ gallery, className, timer = 5000, autoFlip=false }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isOpen, open, close } = useModal();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    if (!gallery || gallery.length === 0) return null;

    const sortedGallery = [...gallery].sort((a, b) => a.sort - b.sort);
    const total = sortedGallery.length;

    const nextSlide = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentIndex(prev => prev >= total - 1 ? 0 : prev + 1);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => prev > 0 ? prev - 1 : total - 1);
    };

    const goToSlide = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    const handleGalleryClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        open();
    };

    useEffect(() => {
        if (total > 1 && !isOpen) {
            timerRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % total);
            }, timer);
        }

        // Очистка таймера при размонтировании или изменении зависимостей
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [total, timer, isOpen]); // Перезапускаем таймер при изменении этих значений

    // Сброс таймера при ручном переключении слайда
    useEffect(() => {
        if (total > 1 && !isOpen) {
            // Сбрасываем текущий таймер
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            // Запускаем новый таймер
            if (autoFlip)
            timerRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % total);
            }, timer);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [currentIndex, total, timer, isOpen]); // Сбрасываем при ручном переключении

    return (
        <>
            <div
                className={`w-full group/slider rounded-[16px] overflow-hidden h-full shadow-sm cursor-zoom-in relative ${className}`}
                onClick={handleGalleryClick}
            >
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {sortedGallery.map((img, idx) => {
                        const isNear = Math.abs(idx - currentIndex) <= 2;
                        return (
                            <div key={img.id} className="w-full flex-none max-w-full relative h-full">
                                {isNear ? (
                                    <img src={img.image_url} className="w-full h-full object-cover block" draggable="false" alt="" />
                                ) : (
                                    <div className="w-full h-full bg-border-default/10" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {total > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 z-10 ${
                                currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/slider:opacity-100 hover:bg-white/20"
                            }`}
                        >
                            <svg className="w-5 h-5 ml-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 z-10 ${
                                currentIndex === total - 1 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/slider:opacity-100 hover:bg-white/20"
                            }`}
                        >
                            <svg className="w-5 h-5 mr-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm z-10">
                            {sortedGallery.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => goToSlide(e, idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentIndex ? "bg-white w-4" : "bg-white/40 hover:bg-white/80 w-1.5"
                                    }`}
                                    aria-label={`Перейти к слайду ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {isOpen && (
                <GalleryModal
                    isOpen={isOpen}
                    close={close}
                    gallery={sortedGallery}
                    initialIndex={currentIndex}
                />
            )}
        </>
    );
}