"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useModal } from "@/shared/lib/hooks/useModal";
import GalleryModal from "../gallery-modal/GalleryModal";
import { checkIsVideo } from "@/shared/lib/utils/checkIsVideo";
import SmartMedia from "@/shared/ui/smart-media/SmartMedia";

interface Props {
    gallery: Record<string, any>[] | null;
    className?: string;
    timer?: number;
    autoFlip?: boolean;
}

export default function Gallery({
                                    gallery,
                                    className,
                                    timer = 5000,
                                    autoFlip = false,
                                }: Props) {
    const { isOpen, open, close } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);

    const sortedGallery = useMemo(() => {
        return gallery ? [...gallery].sort((a, b) => a.sort - b.sort) : [];
    }, [gallery]);

    const total = sortedGallery.length;
    const isSingle = total === 1;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        skipSnaps: false,
        watchDrag: !isSingle,
        containScroll: "trimSnaps",
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
        e.stopPropagation(); // Стопаем всплытие, чтобы не триггерить open()
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Стопаем всплытие, чтобы не триггерить open()
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
            <div className={`w-full max-w-full relative group/slider select-none ${className || ""}`}>

                {/* ДАММИ-КОНТЕЙНЕР ДЛЯ РАСЧЕТА ВЫСОТЫ */}
                <div className="grid grid-cols-1 grid-rows-1 w-full pointer-events-none opacity-0 invisible max-h-[600px] min-h-[180px]" aria-hidden="true">
                    {sortedGallery.map((img) => {
                        const isVideo = checkIsVideo(img?.image_url);
                        return (
                            <div key={`dummy-${img.id}`} className="col-start-1 row-start-1 w-full h-auto">
                                {isVideo ? (
                                    <video src={img?.image_url} className="w-full h-auto object-contain aspect-video" />
                                ) : (
                                    <img src={img?.image_url} className="w-full h-auto object-contain" alt="" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* СЧЕТЧИК СЛАЙДОВ (сделан div'ом и pointer-events-none, чтоб под ним кликалось) */}
                {total > 1 && (
                    <div className="absolute right-[4%] top-[6%] px-3 py-1 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white z-30 text-xs font-light pointer-events-none">
                        {currentIndex + 1}/{total}
                    </div>
                )}

                {/* ОСНОВНОЙ СЛАЙДЕР */}
                <div className="absolute inset-0 w-full h-full">
                    <div
                        ref={emblaRef}
                        className="overflow-hidden h-full w-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            open();
                        }}
                    >
                        <div className="flex backface-hidden w-full h-full">
                            {sortedGallery.map((img) => {
                                return (
                                    <div
                                        key={img.id}
                                        className="min-w-0 h-full w-full flex-[0_0_100%]"
                                    >
                                        <div className="w-full h-full overflow-hidden relative flex items-center justify-center  rounded-none">
                                            {/* 1. БЛЮР ЗАДНЕГО ФОНА */}
                                            <div className="absolute inset-0 w-full h-full blur-[10px] opacity-40 scale-105 pointer-events-none select-none z-0">
                                                <SmartMedia
                                                    src={img?.image_url}
                                                    className="!object-cover w-full h-full"
                                                    wrapperClassName="w-full h-full"
                                                />
                                            </div>

                                            {/* 2. ОСНОВНОЙ КОНТЕНТ */}
                                            <SmartMedia
                                                src={img?.image_url}
                                                className="!object-contain w-full h-full max-h-full relative z-10"
                                                wrapperClassName="w-full h-full flex items-center justify-center"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* КЛИКАБЕЛЬНЫЕ ОБЛАСТИ НАВИГАЦИИ */}
                {total > 1 && (
                    <>
                        {/* ЛЕВАЯ ОБЛАСТЬ (25% ширины) */}
                        <div
                            onClick={scrollPrev}
                            className={`absolute left-0 top-0 h-full w-[12%] flex items-center justify-center z-20 cursor-pointer ${
                                currentIndex === 0 ? "pointer-events-none" : ""
                            }`}
                        >
                            <button
                                className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 opacity-0 group-hover/slider:opacity-100 hover:bg-white/20 ${
                                    currentIndex === 0 ? "!opacity-0" : ""
                                }`}
                            >
                                <svg className="w-5 h-5 ml-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* ПРАВАЯ ОБЛАСТЬ (25% ширины) */}
                        <div
                            onClick={scrollNext}
                            className={`absolute right-0 top-0 h-full w-[12%] flex items-center justify-center z-20 cursor-pointer ${
                                currentIndex === total - 1 ? "pointer-events-none" : ""
                            }`}
                        >
                            <button
                                className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white transition-all duration-200 active:scale-95 opacity-0 group-hover/slider:opacity-100 hover:bg-white/20 ${
                                    currentIndex === total - 1 ? "!opacity-0" : ""
                                }`}
                            >
                                <svg className="w-5 h-5 mr-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
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