import {$fetch} from "@/shared/api/fetch";

export async function getDocument({document_id, callBack=(state?: any) => {}}) {

    const response = await $fetch(`documents/${document_id}`)

    const document_ = response?.json?.document

    if (document_) {
        callBack(document_)
    }
}