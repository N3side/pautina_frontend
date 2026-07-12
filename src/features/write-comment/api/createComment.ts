import { $fetch } from "@/shared/api/fetch";

interface CreateCommentProps {
    text: string;
    entity: string;
    entity_id: string;
    parentComment?: Record<string, any> | null;
}

export async function createComment({
        text,
        entity,
        entity_id,
        parentComment,
    }: CreateCommentProps) {
    if (!text.trim()) {
        return {
            ok: false,
            comment: null,
        };
    }

    const body: Record<string, any> = {
        entity,
        entity_id,
        content: text,
    };

    if (parentComment?.id) {
        body.parent_id = parentComment.id;
    }

    const response = await $fetch("comments", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    return {
        ok: response?.response?.ok,
        comment: response?.json?.comment,
        errors: response?.json?.errors,
    };
}