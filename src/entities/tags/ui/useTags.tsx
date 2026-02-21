import Tag from "@/shared/ui/Buttons/Tag";
import {useCallback, useMemo, useState} from "react";
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
                name: input.value.trim(),
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

    const Tags =
    <div className="flex gap-3">
    {
        tags.map((tag) => (
            <Tag
                key={tag.id}
                color={tag.color}
                tag={tag.name}
                onRemove={(e) => deleteTag(e, tag.id)}
            />
        ))
    }
    </div>

    return {
        tags,
        setTags,
        Tags,
        addTag,
        deleteTag
    };
}