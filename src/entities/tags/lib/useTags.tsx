import {useCallback, useEffect, useState} from "react";
import {v4} from 'uuid';
import chroma from "chroma-js";

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface Props {
    tagsInitial?: Tag[] | null;
}

export default function useTags({tagsInitial = null}: Props) {

    const [tags, setTags] = useState<Tag[] | null>(() => {
        if (tagsInitial && Array.isArray(tagsInitial)) {
            return tagsInitial;
        }
        return [];
    });

    useEffect(() => {
        setTags(tagsInitial)
    }, [tagsInitial]);

    const addTag = ((e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;

        if (input.value?.trim()) {
            const newTag: Tag = {
                id: v4(),
                name: input.value.trim(),
                color: chroma.random().brighten(1).hex()
            };

            setTags(prev => [...prev || [], newTag]);
            input.value = '';
        }
    });

    const deleteTag = ((e: React.MouseEvent, tagId: string) => {
        e.preventDefault();
        setTags(prev => prev && prev.filter(tag => tag.id !== tagId));
    });

    return {
        tags,
        setTags,
        addTag,
        deleteTag
    };
}