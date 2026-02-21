import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { smooth } from "@/shared/styles/animations";

interface FileInputProps {
    name?: string
    label?: string;
    error?: string | null;
    onChange: (file: File | null) => void;
    accept?: string;
    className?: string;
    placeholder?: string;
}

const FileInput = ({
        name,
        label,
        error,
        onChange,
        accept = "image/*,application/pdf",
        className,
        placeholder = "Нажмите или перетащите файл сюда"
   }: FileInputProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Обработка выбора через проводник
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        processFile(file);
    };

    // Обработка Drag-and-Drop
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0] || null;
        processFile(file);
    };

    const processFile = (file: File | null) => {
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };

    const triggerInput = () => fileInputRef.current?.click();

    return (
        <div className={`flex flex-col gap-1.5 w-full h-full ${className || ''}`}>
            {label && (
                <p className="text-label">
                    {label}
                </p>
            )}

            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerInput}
                className={`
                    relative group cursor-pointer
                    w-full min-h-[100px] h-full py-4 px-6 rounded-xl ${smooth}
                    border border-dashed glass-effect
                    flex flex-col items-center justify-center gap-2
                    ${isDragging ? 'border-brand bg-brand/5 ring-4 ring-brand/10' : 'border-border-default hover:border-brand/50'}
                    ${error ? 'border-red-500 bg-red-50/10' : ''}
                `}
            >
                <input
                    name={name}
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />

                {/* Иконка */}
                <div className={`
                    p-2 rounded-full transition-colors duration-200
                    ${isDragging ? 'bg-brand/20 text-brand' : 'bg-surface/50 text-text-muted group-hover:text-brand'}
                `}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>

                {/* Текст */}
                <div className="text-center">
                    <p className="text-sm font-medium text-text-main">
                        {fileName ? fileName : placeholder}
                    </p>
                    <p className="text-xs text-text-muted/60 mt-1">
                        {fileName ? 'Файл распознан. Нажмите, чтобы заменить' : 'PNG, JPG, JPEG, WEBP, PDF до 5МБ'}
                    </p>
                </div>

                {/* Индикатор ошибки внутри зоны */}
                {error && (
                    <div className="absolute right-4 top-4 text-red-500 animate-pulse">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </div>

            {error && (
                <div className="min-h-[20px] ml-1">
                    <span className="text-red-500 text-[12px] font-medium">
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FileInput;