"use client"

import {useState, useMemo, useEffect} from "react";
import GalleryCard from "@/shared/ui/gallery-card/GalleryCard";
import { $fetch } from "@/shared/api/fetch";

interface Props {
    cards: any;
    setCards: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    entity?: string;
    isClientOnly?: boolean;
    className?: string
}

export default function EditGallery({ cards, setCards, entity = "post", isClientOnly = false, className }: Props) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const sortedCards = useMemo(() => {
        return [...cards].sort((a, b) => (a.sort || 0) - (b.sort || 0));
    }, [cards]);

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const draggedCard = sortedCards[draggedIndex];
        const targetCard = sortedCards[targetIndex];

        const isLocalCard =  !draggedCard.entity_id;
        console.log(isLocalCard)

        if (isLocalCard) {
            setCards((prev) => prev.map((card) => {
                if (card.id === draggedCard.id) return { ...card, sort: targetCard.sort };
                if (card.id === targetCard.id) return { ...card, sort: draggedCard.sort };
                return card;
            }));
        } else {
            const payload = JSON.stringify({
                "order": [
                    { image_id: draggedCard.id, sort: targetCard.sort },
                    { image_id: targetCard.id, sort: draggedCard.sort }
                ]
            });

            const response = await $fetch(`images`, {
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

    async function onDelete(image_id: string) {

        const response = await $fetch(`images/${image_id}`, {
            method: "DELETE"
        });

        if (response?.response?.ok) {
            setCards(prev => prev.filter(image => image?.id !== image_id));
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
                        onRemove={() => onDelete(card.id)}
                    />
                </div>
            ))}
        </div>
    );
}