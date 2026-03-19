// src/shared/lib/hooks/useImageSelection.ts
import {ChangeEvent, useEffect, useState} from "react";

// shared/lib/hooks/useImageSelection.ts
export function useImageSelection(onSelect?: (file: File) => void) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile?.type.startsWith("image/")) {
            setFile(selectedFile);
            // Вот тут триггерим открытие модалки
            if (onSelect) onSelect(selectedFile);
        }
    };

    return {
        file,
        previewUrl,
        reset: () => setFile(null),
        inputProps: { onChange }
    };
}