import {$fetch} from "@/shared/api/fetch";

export async function deleteDocument({document_id, callBack=() => {}}) {

    const response = await $fetch(`documents/${document_id}`, {
        method: "DELETE"
    })

    callBack()

    return response

}