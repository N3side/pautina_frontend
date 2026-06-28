"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useModal } from "@/shared/lib/hooks/useModal";
import GalleryModal from "../gallery-modal/GalleryModal";
import { checkIsVideo } from "@/shared/lib/utils/checkIsVideo";

interface Props {
    gallery: Record<string, any>[] | null;
    className?: string;
    timer?: number;
    autoFlip?: boolean;
}

export default function Gallery({ gallery, className, timer = 5000, autoFlip = false }: Props) {
    const { isOpen, open, close } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);

    const sortedGallery = gallery ? [...gallery].sort((a, b) => a.sort - b.sort) : [];
    const total = sortedGallery.length;
    const isSingle = total === 1; // Проверяем, один ли элемент в галерее

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "center",
        skipSnaps: false,
        watchDrag: !isSingle, // Отключаем перетаскивание мышкой, если слайд один
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const goToSlide = useCallback((e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || !autoFlip || isOpen || total <= 1) return;

        const interval = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            }
        }, timer);

        return () => clearInterval(interval);
    }, [emblaApi, autoFlip, isOpen, timer, total]);

    if (total === 0) return null;

    return (
        <>
            <div className={`w-full relative group/slider select-none ${className || ""}`}>
                <div
                    ref={emblaRef}
                    className="overflow-hidden rounded-[16px] cursor-zoom-in"
                    onClick={(e) => {
                        e.stopPropagation();
                        open();
                    }}
                >
                    <div className="flex backface-hidden">
                        {sortedGallery.map((img, idx) => {
                            const isVideo = checkIsVideo(img?.image_url);
                            const isActive = idx === currentIndex;

                            return (
                                <div
                                    key={img.id}
                                    // Если слайд один — ставим 100% ширины и убираем px-1
                                    className={`min-w-0 transition-all duration-500 ease-out 
                                        ${isSingle ? "flex-[0_0_100%]" : "flex-[0_0_85%] px-1"}`}
                                    style={{
                                        transform: isSingle || isActive ? "scale(1)" : "scale(0.96)",
                                        opacity: isSingle || isActive ? 1 : 0.5,
                                    }}
                                >
                                    <div className="w-full h-full overflow-hidden rounded-[16px] bg-neutral-900 relative aspect-[4/3] flex items-center justify-center">
                                        {isVideo ? (
                                            <video src={img.image_url} autoPlay loop muted playsInline className="w-full h-full object-cover block" draggable="false" />
                                        ) : (
                                            <img src={img.image_url} className="w-full h-full object-cover block" draggable="false" alt="" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {total > 1 && (
                    <>
                        <button
                            onClick={scrollPrev}
                            className={`absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 opacity-0 group-hover/slider:opacity-100 hover:bg-white/20 z-10 ${
                                currentIndex === 0 ? "pointer-events-none !opacity-0" : ""
                            }`}
                        >
                            <svg className="w-5 h-5 ml-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={scrollNext}
                            className={`absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 opacity-0 group-hover/slider:opacity-100 hover:bg-white/20 z-10 ${
                                currentIndex === total - 1 ? "pointer-events-none !opacity-0" : ""
                            }`}
                        >
                            <svg className="w-5 h-5 mr-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm z-10">
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