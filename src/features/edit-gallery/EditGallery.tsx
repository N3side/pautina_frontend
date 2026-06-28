"use client"

import {useEffect, useState} from "react";
import GalleryCard from "@/shared/ui/gallery-card/GalleryCard";
import { $fetch } from "@/shared/api/fetch";

interface EditGalleryProps {
    cards: Record<string, any>[];
    setCards: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    entity?: string;
    isClientOnly?: boolean; // Прокидываем флаг сюда тоже
    className?: string
}

export default function EditGallery({ cards, setCards, entity = "posts", isClientOnly = false, className }: EditGalleryProps) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const sortedCards = [...cards].sort((a, b) => (a.sort || 0) - (b.sort || 0));

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const draggedCard = sortedCards[draggedIndex];
        const targetCard = sortedCards[targetIndex];

        // Проверяем, локальная ли это карточка (у временных карт нет реального entity_id)
        const isLocalCard = isClientOnly || !draggedCard.entity_id;

        if (isLocalCard) {
            // СЦЕНАРИЙ 1: Просто меняем их sort местами локально в памяти
            setCards((prev) => prev.map((card) => {
                if (card.id === draggedCard.id) return { ...card, sort: targetCard.sort };
                if (card.id === targetCard.id) return { ...card, sort: draggedCard.sort };
                return card;
            }));
        } else {
            // СЦЕНАРИЙ 2: Карточка уже на сервере — шлем запрос
            const payload = JSON.stringify({
                "order": [
                    { image_id: draggedCard.id, sort: targetCard.sort },
                    { image_id: targetCard.id, sort: draggedCard.sort }
                ]
            });

            const response = await $fetch(`${entity}/${draggedCard.entity_id}/gallery/sort`, {
                method: "PATCH",
                body: payload,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (response?.response?.ok) {
                setCards((prev) => prev.map((card) => {
                    if (card.id === draggedCard.id) return { ...card, sort: targetCard.sort };
                    if (card.id === targetCard.id) return { ...card, sort: draggedCard.sort };
                    return card;
                }));
            }
        }
        setDraggedIndex(null);
    };

    async function onDelete(entity_id, image_id) {

        let response

        if (!isClientOnly) {
            response = await $fetch(`posts/${entity_id}/gallery/${image_id}`, {
                method: "DELETE"
            })
        }

        if (response?.response?.ok || isClientOnly) {
            setCards(prev => {
                return prev.filter(image => image?.id !== image_id)
            })
        }
    }

    return (
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 ${className}`}>
            {sortedCards.map((card, i) => (
                <div
                    key={card?.id}
                    draggable
                    onDragStart={(e) => {
                        setDraggedIndex(i);
                        e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, i)}
                    className="cursor-grab"
                >
                    <GalleryCard
                        image={card}
                        onRemove={() => onDelete(card.entity_id, card.id)}
                    />
                </div>
            ))}
        </div>
    );
}