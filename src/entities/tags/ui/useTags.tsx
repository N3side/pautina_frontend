import Tag from "@/shared/ui/Buttons/Tag";
import { useState, useCallback, useMemo } from "react";
import { v4 } from 'uuid';
import chroma from "chroma-js";

interface Tag {
    id: string;
    tag: string;
    color: string;
}

interface UseTagsProps {
    tagsInitial?: Tag[] | null;
}

export default function useTags({ tagsInitial = null }: UseTagsProps = {}) {
    // Всегда инициализируем состояние, даже если tagsInitial null
    const [tags, setTags] = useState<Tag[]>(() => {
        if (tagsInitial && Array.isArray(tagsInitial)) {
            return tagsInitial;
        }
        return [];
    });

    const addTag = useCallback((e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;

        if (input.value?.trim()) {
            const newTag: Tag = {
                id: v4(),
                tag: input.value.trim(),
                color: chroma.random().brighten(1).hex()
            };

            setTags(prev => [...prev, newTag]);
            input.value = '';
        }
    }, []);

    const deleteTag = useCallback((e: React.MouseEvent, tagId: string) => {
        e.preventDefault();
        setTags(prev => prev.filter(tag => tag.id !== tagId));
    }, []);

    // Мемоизируем рендер тегов
    const Tags = useMemo(() => {
        return tags.map((tag) => (
            <Tag
                key={tag.id}
                color={tag.color}
                tag={tag.tag}
                onRemove={(e) => deleteTag(e, tag.id)}
            />
        ));
    }, [tags, deleteTag]);

    return {
        tags,
        setTags,
        Tags,
        addTag,
        deleteTag
    };
}