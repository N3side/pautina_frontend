"use client"

import {useState, useMemo} from "react";
import GalleryCard from "@/shared/ui/gallery-card/GalleryCard";

interface Props {
    cards: any;
    setCards: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    entity?: string;
    isClientOnly?: boolean;
    className?: string
    cardClassName?: string
    onDelete: (id: string | number) => void;
}

export default function EditGallery({ cards, setCards, className, cardClassName, onDelete }: Props) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const sortedCards = useMemo(() => {
        return [...cards].sort((a, b) => (a.sort || 0) - (b.sort || 0));
    }, [cards]);

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;
        const draggedCard = sortedCards[draggedIndex];
        const targetCard = sortedCards[targetIndex];

        // Логику сортировки оставляем здесь, так как она визуальная
        setCards((prev) => prev.map((card) => {
            if (card.id === draggedCard.id) return { ...card, sort: targetCard.sort };
            if (card.id === targetCard.id) return { ...card, sort: draggedCard.sort };
            return card;
        }));

        setDraggedIndex(null);
    };

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
                        className={cardClassName}
                        image={card}
                        onRemove={() => onDelete(card.id)} // <-- Просто вызываем колбэк
                    />
                </div>
            ))}
        </div>
    );
}