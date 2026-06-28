"use client";

import { useRef, useState } from "react";
import { $fetch } from "@/shared/api/fetch";

interface UseGalleryLogicProps {
    entity: string;
    isClientOnly?: boolean; // true — копим на клиенте, false — сразу шлем на бэк
    existingEntityId?: number | string; // Передаем сюда ID, только если РЕДАКТИРУЕМ старый пост
}

export function useGalleryLogic({ entity, isClientOnly = false, existingEntityId }: UseGalleryLogicProps) {
    const [gallery, setGallery] = useState<Record<string, any>[]>([]);
    // Мапа для хранения сырых файлов: "temp_id" -> File
    const pendingFilesRef = useRef<Map<string, File>>(new Map());
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTriggerSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (isClientOnly) {
            // СЦЕНАРИЙ 1: Генерируем временный ID и превью для реакта
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
            // СЦЕНАРИЙ 2: Старый режим редактирования (берем переданный id)
            const formData = new FormData();
            formData.set("image", file);

            const response = await $fetch(`${entity}/${existingEntityId}/gallery/load`, {
                method: "PATCH",
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
            // Удаляем локально
            const fileData = pendingFilesRef.current.get(String(imageId));
            if (fileData) URL.revokeObjectURL(fileData.name);
            pendingFilesRef.current.delete(String(imageId));
            setGallery((prev) => prev.filter((c) => c.id !== imageId));
        } else {
            // Удаляем с сервера для старого режима
            const response = await $fetch(`${entity}/${existingEntityId}/gallery/${imageId}`, {
                method: "DELETE"
            });

            if (response?.response?.ok) {
                setGallery((prev) => prev.filter((c) => c.id !== imageId));
            }
        }
    };

    // Та самая функция, куда ты прокинешь полученный response?.json?.post_id
    const uploadAllPendingFiles = async (targetPostId: number | string) => {
        if (!isClientOnly) return;

        // Сортируем по актуальному порядку драг-н-дропа перед отправкой
        const sortedGallery = [...gallery].sort((a, b) => (a.sort || 0) - (b.sort || 0));
        const uploadedImages = [];

        for (const card of sortedGallery) {
            const file = pendingFilesRef.current.get(card.id);
            if (!file) continue;

            const formData = new FormData();
            formData.set("image", file);

            // Шлем PATCH запрос на эндпоинт с реальным post_id
            const response = await $fetch(`${entity}/${targetPostId}/gallery/load`, {
                method: "PATCH",
                body: formData
            });

            const responseData = response?.json;
            const newCard = responseData?.image || responseData;
            if (newCard) uploadedImages.push(newCard);
        }

        pendingFilesRef.current.clear();
        setGallery(uploadedImages); // Обновляем стейт уже серверными данными
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