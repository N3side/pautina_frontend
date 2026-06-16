"use client"

import { useState } from "react";
import GalleryCard from "@/shared/ui/gallery-card/GalleryCard";
import { $fetch } from "@/shared/api/fetch";

export default function EditGallery({ cards, setCards }) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Всегда получаем актуальный отсортированный массив
    const sortedCards = [...cards].sort((a, b) => (a.sort || 0) - (b.sort || 0));

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const draggedCard = sortedCards[draggedIndex];
        const targetCard = sortedCards[targetIndex];

        const payload = JSON.stringify({
            "order": [
                {
                    image_id: draggedCard.id,
                    sort: targetCard.sort
                },
                {
                    image_id: targetCard.id,
                    sort: draggedCard.sort
                }
            ]
        });

        const response = await sendSorted(payload, draggedCard.entity_id);

        if (response?.response?.ok) {
            setCards((prev) => prev.map((card) => {
                if (card.id === draggedCard.id) return { ...card, sort: targetCard.sort };
                if (card.id === targetCard.id) return { ...card, sort: draggedCard.sort };
                return card;
            }));
        }

        setDraggedIndex(null);
    };

    async function sendSorted(cards, project_id) {
        const response = await $fetch(`posts/${project_id}/gallery/sort`, {
            method: "PATCH",
            body: cards,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        return response;
    }

    // Функция для добавления новой карточки
    const handleAddCard = (newCard) => {
        setCards(prev => [...prev, newCard]);
    };

    // Функция для обновления существующей карточки
    const handleUpdateCard = (updatedCard) => {
        setCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
    };

    // Функция для удаления карточки
    const handleRemoveCard = (cardId) => {
        setCards(prev => prev.filter(c => c.id !== cardId));
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
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
                        onUploadSuccess={handleUpdateCard}
                        onRemove={() => handleRemoveCard(card.id)}
                    />
                </div>
            ))}

            <GalleryCard
                isAddImage={true}
                onUploadSuccess={handleAddCard}
            />
        </div>
    );
}