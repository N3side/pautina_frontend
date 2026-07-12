import { useState, useEffect, useMemo, useRef } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';

interface SmartMediaProps {
    src: string | null; // Разрешаем null в типах
    alt?: string;
    className?: string;
    wrapperClassName?: string;
}

export default function SmartMedia({
                                       src,
                                       alt = "",
                                       className = "",
                                       wrapperClassName = ""
                                   }: SmartMediaProps) {

    // 1. РАННИЙ ВЫХОД: если src нет, ничего не рендерим
    if (!src) return null;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Определяем тип
    const mediaType = useMemo(() => {
        const lowerSrc = src.toLowerCase();

        const videoExts = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.avi', '.mkv'];
        if (videoExts.some(ext => lowerSrc.includes(ext))) return 'video';

        const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.tiff'];
        if (imageExts.some(ext => lowerSrc.includes(ext))) return 'image';

        return 'file';
    }, [src]);

    const fileName = useMemo(() => {
        try {
            const url = new URL(src);
            const path = url.pathname;
            return path.substring(path.lastIndexOf('/') + 1) || 'Файл';
        } catch {
            return src.split('/').pop() || 'Файл';
        }
    }, [src]);

    useEffect(() => {
        if (mediaType === 'file') {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        const checkStatus = () => {
            if (mediaType === 'image' && imgRef.current) {
                if (imgRef.current.complete) {
                    if (imgRef.current.naturalWidth === 0) setIsError(true);
                    setIsLoading(false);
                }
            } else if (mediaType === 'video' && videoRef.current && videoRef.current.readyState >= 2) {
                setIsLoading(false);
            }
        };

        checkStatus();
        const timeoutId = setTimeout(checkStatus, 50);
        return () => clearTimeout(timeoutId);
    }, [src, mediaType]);

    // Рендер карточки файла
    if (mediaType === 'file') {
        return (
            <div className={`relative w-full h-full flex items-center justify-center bg-surface/50 border border-white/10 rounded-lg ${wrapperClassName}`}>
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                    <DescriptionIcon className="text-text-muted !text-6xl opacity-80" />
                    <div className="flex flex-col gap-1">
                        <p className="text-text-main font-medium text-sm truncate max-w-[200px]" title={fileName}>
                            {fileName}
                        </p>
                        <a
                            href={src}
                            download={fileName}
                            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DownloadIcon fontSize="small" />
                            Скачать
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${wrapperClassName}`}>
            {/* Анимация загрузки */}
            {isLoading && !isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/40 animate-pulse backdrop-blur-md z-10">
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            {/* Блок ошибки */}
            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface z-20">
                    <p className="text-text-main font-light text-secondary text-2xl tracking-wider">
                        404
                    </p>
                </div>
            )}

            {/* Рендер медиа */}
            {mediaType === 'video' ? (
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