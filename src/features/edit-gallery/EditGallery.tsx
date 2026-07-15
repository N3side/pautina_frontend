"use client"

import {useState, useMemo} from "react";
import GalleryCard from "@/shared/ui/gallery-card/GalleryCard";

interface Props {
    cards: any;
    setCards: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
    onSortChange: () => void;
    onDelete: (id: string | number) => void;
    className?: string;
    cardClassName?: string;
}

export default function EditGallery({ cards, setCards, className, cardClassName, onDelete, onSortChange }: Props) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const sortedCards = useMemo(() => {
        return [...cards].sort((a, b) => (a.sort || 0) - (b.sort || 0));
    }, [cards]);

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        targetIndex: number
    ) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const newCards = [...sortedCards];

        const [removed] = newCards.splice(draggedIndex, 1);
        newCards.splice(targetIndex, 0, removed);

        const updated = newCards.map((card, index) => ({
            ...card,
            sort: index + 1,
        }));

        setCards(updated);

        onSortChange();

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