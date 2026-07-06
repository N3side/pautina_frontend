import { useState, useEffect, useMemo, useRef } from "react";

interface SmartMediaProps {
    src: string;
    alt?: string;
    className?: string;        // Стили для самой картинки/видео
    wrapperClassName?: string; // Стили для контейнера
}

export default function SmartMedia({
       src,
       alt = "",
       className = "",
       wrapperClassName = ""
   }: SmartMediaProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Автоматически определяем тип контента
    const isVideo = useMemo(() => {
        if (!src) return false;
        const videoExtensions = /\.(mp4|webm|ogg|mov|m4v|avi|mkv)(?:\?|$)/i;
        return videoExtensions.test(src);
    }, [src]);

    // Сброс состояний и глубокая проверка кэша
    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        const checkStatus = () => {
            if (!isVideo && imgRef.current) {
                if (imgRef.current.complete) {
                    // Если загрузка 'завершена', но ширина 0 — это битая картинка
                    if (imgRef.current.naturalWidth === 0) {
                        setIsError(true);
                    }
                    setIsLoading(false);
                }
            } else if (isVideo && videoRef.current && videoRef.current.readyState >= 2) {
                setIsLoading(false);
            }
        };

        // Проверяем сразу и на всякий случай через микро-таймаут, пока монтируется DOM
        checkStatus();
        const timeoutId = setTimeout(checkStatus, 50);

        return () => clearTimeout(timeoutId);
    }, [src, isVideo]);

    return (
        <div className={`relative w-full h-full ${wrapperClassName}`}>

            {/* Анимация загрузки */}
            {isLoading && !isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/40 animate-pulse backdrop-blur-md">
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            {/* Блок ошибки: теперь он перекрывает контент сверху и гарантированно имеет размеры */}
            {isError && (
                // bg-neutral-950/80 и z-20 добавлены, чтобы перекрывать поломанную картинку
                <div className="absolute inset-0 flex items-center justify-center bg-surface">
                    {/* Родительский flex сам центрует этот элемент. Никаких absolute и translate тут не надо! */}
                    <p className="text-text-main font-light text-secondary text-2xl tracking-wider animate-fade-in">
                        404
                    </p>
                </div>
            )}

            {/* Рендер медиа */}
            {isVideo ? (
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setIsError(true);
                    }}
                    className={`w-full h-full object-cover block transition-opacity duration-500 ease-in-out ${
                        isLoading || isError ? "opacity-0" : "opacity-100"
                    } ${className}`}
                    draggable="false"
                />
            ) : (
                <img
                    ref={imgRef}
                    src={src}
                    onLoad={() => {
                        setIsLoading(false);
                        setIsError(false);
                    }}
                    onError={() => {
                        setIsLoading(false);
                        setIsError(true);
                    }}
                    // Не удаляем из DOM, просто гасим видимость, сохраняя высоту контейнера
                    className={`object-contain w-full h-full block transition-opacity duration-500 ease-in-out ${
                        isLoading || isError ? "opacity-0" : "opacity-100"
                    } ${className}`}
                    draggable="false"
                    alt={alt}
                />
            )}
        </div>
    );
}