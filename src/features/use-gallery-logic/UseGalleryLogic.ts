"use client";

import {useEffect, useRef, useState} from "react";
import { $fetch } from "@/shared/api/fetch";

interface UseGalleryLogicProps {
    entity: string;
    isClientOnly?: boolean;
    existingEntityId?: number | string;
    galleryInit?: Record<string, any>[]
}

export function useGalleryLogic({ entity, isClientOnly = false, existingEntityId, galleryInit }: UseGalleryLogicProps) {
    const [gallery, setGallery] = useState<Record<string, any>[]>(galleryInit || []);
    const pendingFilesRef = useRef<Map<string, File>>(new Map());
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Синхронизация с galleryInit при изменении
    useEffect(() => {
        if (galleryInit && Array.isArray(galleryInit) && galleryInit?.length > 0) {
            setGallery(galleryInit);
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

            pendingFilesRef.current.set(tempId, file);

            const newCard = {
                id: tempId,
                image_url: previewUrl,
                sort: gallery.length
            };

            setGallery((prev) => [...prev, newCard]);
        } else {
            const formData = new FormData();
            formData.set("image", file);
            formData.set("entity", entity);

            if (existingEntityId) {
                formData.set("entity_id", String(existingEntityId));
            }

            const response = await $fetch(`images`, {
                method: "POST",
                body: formData
            });

            const responseData = response?.json;
            const newCard = responseData?.image || responseData;

            if (newCard) {
                setGallery((prev) => [...prev, newCard]);
            }
        }

        event.target.value = '';
    };

    const handleDelete = async (imageId: number | string) => {
        const isTemp = String(imageId).startsWith("temp_");

        if (isTemp) {
            const fileData = pendingFilesRef.current.get(String(imageId));
            if (fileData) URL.revokeObjectURL(fileData.name);
            pendingFilesRef.current.delete(String(imageId));
            setGallery((prev) => prev.filter((c) => c.id !== imageId));
        } else {
            const response = await $fetch(`images/${imageId}`, {
                method: "DELETE"
            });

            if (response?.response?.ok) {
                setGallery((prev) => prev.filter((c) => c.id !== imageId));
            }
        }
    };

    const uploadAllPendingFiles = async (targetPostId: number | string) => {
        if (!isClientOnly) return;

        const sortedGallery = [...gallery].sort((a, b) => (a.sort || 0) - (b.sort || 0));
        const uploadedImages: Record<string, any>[] = []; // ✅ Явно указываем тип

        for (const card of sortedGallery) {
            const file = pendingFilesRef.current.get(card.id);
            if (!file) continue;

            const formData = new FormData();
            formData.set("image", file);
            formData.set("entity", entity);
            formData.set("entity_id", String(targetPostId));

            const response = await $fetch(`images`, {
                method: "POST",
                body: formData
            });

            const newCard = response?.json?.image || [];
            if (newCard) uploadedImages.push(newCard);
        }

        pendingFilesRef.current.clear();

        // Если нужно обновить галерею после загрузки
        if (uploadedImages.length > 0) {
            setGallery(uploadedImages);
        }
    };

    return {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles,
        gallery,
        setGallery
    };
}