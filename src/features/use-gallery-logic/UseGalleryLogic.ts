"use client";

import { useEffect, useRef, useState } from "react";
import { $fetch } from "@/shared/api/fetch";
import { usePendingFiles } from "@/features/use-gallery-logic/usePendingFiles";

interface UseGalleryLogicProps {
    entity: string;
    isClientOnly?: boolean;
    existingEntityId?: number | string;
    galleryInit?: Record<string, any>[];
}

export function useGalleryLogic({
        entity,
        isClientOnly = false,
        existingEntityId,
        galleryInit
    }: UseGalleryLogicProps) {
    const [gallery, setGallery] = useState<Record<string, any>[]>(galleryInit || []);
    const [trashImages, setTrashImages] = useState<(number | string)[]>([]);
    const [isOrderChanged, setIsOrderChanged] = useState(false);

    const { addFile, getFile, removeFile, clearAll } = usePendingFiles();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (galleryInit && Array.isArray(galleryInit)) {
            setGallery(galleryInit);
            setTrashImages([]);
            setIsOrderChanged(false);
        }
    }, [galleryInit]);

    const handleTriggerSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (isClientOnly) {
            const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const previewUrl = URL.createObjectURL(file);

            addFile(tempId, file);

            const newCard = {
                id: tempId,
                image_url: previewUrl,
                sort: gallery.length + 1 // Исправлено: sort должен быть корректным
            };

            setGallery((prev) => [...prev, newCard]);
            setIsOrderChanged(true);
        } else {
            const formData = new FormData();
            formData.set("image", file);
            formData.set("entity", entity);
            if (existingEntityId) formData.set("entity_id", String(existingEntityId));

            const response = await $fetch(`images`, {
                method: "POST",
                body: formData
            });

            const newCard = response?.json?.image || response?.json;
            if (newCard) {
                setGallery((prev) => [...prev, newCard]);
            }
        }
        event.target.value = '';
    };

    const handleDelete = (imageId: number | string) => {
        const isTemp = String(imageId).startsWith("temp_");

        setGallery((prev) => prev.filter((c) => c.id !== imageId));
        setIsOrderChanged(true);

        if (isTemp) {
            removeFile(String(imageId));
        } else {
            if (isClientOnly) {
                setTrashImages((prev) => [...prev, imageId]);
            } else {
                $fetch(`images/${imageId}`, { method: "DELETE" })
                    .catch(e => console.error("Auto-delete failed", e));
            }
        }
    };

    const sortPendings = () => {
        setGallery(prev => {
            return prev.map((item, index) => ({
                ...item,
                sort: index + 1
            }))
        })
        setIsOrderChanged(true);
    };

    const flushTrash = async () => {
        if (trashImages.length === 0) return;

        for (const id of trashImages) {
            await $fetch(`images/${id}`, { method: "DELETE" }).catch(console.error);
        }
        setTrashImages([]);
    };

    const uploadAllPendingFiles = async (entity_id: number | string) => {
        if (!isClientOnly && !isOrderChanged) return;

        // 1. Удаляем помеченные на удаление
        await flushTrash();

        // 2. Берем АКТУАЛЬНЫЙ порядок из стейта gallery
        const currentSortedGallery = [...gallery].sort((a, b) => (a.sort || 0) - (b.sort || 0));

        const uploadedImages: Record<string, any>[] = [];
        const tempIdsToRemove: string[] = [];

        // Загружаем только временные файлы
        for (const card of currentSortedGallery) {
            const file = getFile(card.id);
            if (!file) continue;

            const formData = new FormData();
            formData.set("image", file);
            formData.set("entity", entity);
            formData.set("entity_id", String(entity_id));

            const response = await $fetch(`images`, {
                method: "POST",
                body: formData
            });

            const newCard = response?.json?.image || response?.json;
            if (newCard) {
                uploadedImages.push(newCard);
                tempIdsToRemove.push(card.id);
            }
        }

        clearAll();

        // 3. Формируем ФИНАЛЬНЫЙ список
        let finalGallery: Record<string, any>[] = [];

        finalGallery = currentSortedGallery
            .filter(card => !tempIdsToRemove.includes(card.id)) // Убираем временные
            .concat(uploadedImages); // Добавляем новые в конец

        // 4. Отправляем сортировку ТОЛЬКО если картинок 2 или больше
        if (finalGallery.length >= 2) {
            const orderPayload = finalGallery.map((img, index) => ({
                image_id: img.id,
                sort: index + 1
            }));

            await $fetch(`images`, { // Лучше использовать отдельный роут для сортировки
                method: "PATCH",
                body: JSON.stringify({ order: orderPayload }),
                headers: { "Content-Type": "application/json" }
            });
        }

        setGallery(finalGallery);
        setIsOrderChanged(false);
    };

    return {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        sortPendings,
        uploadAllPendingFiles,
        flushTrash,
        gallery,
        setGallery,
        addFile,
        getFile,
        removeFile,
        clearAll
    };
}