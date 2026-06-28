"use client"

import {HTMLAttributes, useEffect, useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import MessageForm from "@/entities/message-form/MessageForm";

interface Props extends HTMLAttributes<HTMLDivElement> {
    onSend?: (text: string) => void;
    parentComment?: Record<string, any> | null
    entity: string
    entity_id: string
    setComments?: (any) => any
    setExpanded?: (any) => void
    setOpenCommentation?: (any) => void
}

export default function WriteComment({ className, entity, entity_id, parentComment, setExpanded=() => {}, setOpenCommentation=() => {}, setComments, ...props }: Props) {

    const [text, setText] = useState("");


    async function handleSend(e) {
        e.preventDefault()

        if (!text.trim()) return;

        const body = {
            "entity": entity,
            "entity_id": entity_id,
            "content": text
        }

        if (parentComment && parentComment?.id) {
            body["parent_id"] = parentComment?.id
        }

        const response = await $fetch(`comments`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        if (response?.response?.ok) {
            setText("");
        }

        const comment = response?.json?.comment
        if (comment && setComments) {
            setExpanded(true)
            setOpenCommentation(false)
            setComments(prev => ([...prev, comment]))
        }
    }

    return (
        <MessageForm
            className={className}
            text={text}
            setText={setText}
            handleSend={handleSend}
        />
    );
}