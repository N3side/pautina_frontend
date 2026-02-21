import {$fetch} from "@/shared/api/fetch";

export async function deleteDocument({document_id, callBack=() => {}}) {

    const response = await $fetch(`documents/${document_id}`, {
        method: "DELETE"
    })

    callBack()

    const documents = response?.json?.documents

    console.log(documents)

    if (documents) {
        return documents
    }

}