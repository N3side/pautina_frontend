// shared/hooks/usePendingFiles.ts
import { useRef } from "react";

export function usePendingFiles() {
    const pendingFilesRef = useRef<Map<string, File>>(new Map());

    const addFile = (id: string, file: File) => {
        pendingFilesRef.current.set(id, file);
    };

    const getFile = (id: string): File | undefined => {
        return pendingFilesRef.current.get(id);
    };

    const removeFile = (id: string) => {
        const file = pendingFilesRef.current.get(id);
        if (file) {
            URL.revokeObjectURL(file.name);
        }
        pendingFilesRef.current.delete(id);
    };

    const clearAll = () => {
        pendingFilesRef.current.forEach((file) => {
            URL.revokeObjectURL(file.name);
        });
        pendingFilesRef.current.clear();
    };

    const getAll = () => {
        return new Map(pendingFilesRef.current);
    };

    return {
        pendingFilesRef,
        addFile,
        getFile,
        removeFile,
        clearAll,
        getAll
    };
}