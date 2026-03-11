import {$fetch} from "@/shared/api/fetch";

export async function recognizeDocument({document_id, setIsLoading, setDocumentRecognized}) {

    setIsLoading(true)

    const response = await $fetch(`documents/${document_id}/recognize`)

    const document_ = response?.json?.document

    if (document_) {
        setDocumentRecognized(document_)
    }


    setIsLoading(false)
}