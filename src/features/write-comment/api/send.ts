import {$fetch} from "@/shared/api/fetch";

interface Props {
    entity: string
    entity_id: string
    content: string
    parent_id?: string
}

async function handleSend({entity, entity_id, content, parent_id}: Props) {
    e.preventDefault()

    const body = {
        "entity": entity,
        "entity_id": entity_id,
        "content": content
    }

    if (parent_id) {
        body["parent_id"] = parent_id
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