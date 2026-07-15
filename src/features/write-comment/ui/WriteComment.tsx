"use client"

import {HTMLAttributes, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import MessageForm from "@/entities/message-form/MessageForm";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import EditGallery from "@/features/edit-gallery/EditGallery";

interface Props extends HTMLAttributes<HTMLDivElement> {
    onSend?: (text: string) => void;
    parentComment?: Record<string, any> | null
    entity: string
    entity_id: string
    setComments?: (any) => any
    setExpanded?: (any) => void
    setOpenCommentation?: (any) => void
    placeholder?: string //
}

export default function WriteComment({ className, entity, entity_id, parentComment, setExpanded=() => {}, setOpenCommentation=() => {}, setComments, placeholder, ...props }: Props) {

    const [text, setText] = useState("")

    const {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles,
        gallery,
        setGallery,
        sortPendings
    } = useGalleryLogic({
        entity: "comment",
        isClientOnly: true,
    });

    async function getComment(comment_id) {
        const response = await $fetch(`comments/${comment_id}/one`)

        return response
    }


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
            await uploadAllPendingFiles(comment?.id)
            const response = await getComment(comment?.id)
            await setComments(prev => ([...prev, response?.json?.comment]))
            setExpanded(true)
            setOpenCommentation(false)
        }
    }

    return (
        <div className="flex flex-col gap-2">

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <EditGallery
                cards={gallery}
                setCards={setGallery}
                onDelete={handleDelete}
                onSortChange={sortPendings}
            />

            <MessageForm
                placeholder={placeholder}
                className={className}
                text={text}
                setText={setText}
                handleSend={handleSend}
                handleTriggerSelect={handleTriggerSelect}
            />
        </div>
    );
}