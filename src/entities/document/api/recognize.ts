import {$fetch} from "@/shared/api/fetch";
import toast from "react-hot-toast";


export async function recognizeDocument({document, isLoading, setIsLoading, setDocumentRecognized, setRecognitions}) {

    if (isLoading) {
        toast.success("Документ распознается, подождите...")
        return
    }

    setIsLoading(true)

    const response = await $fetch(`documents/${document?.id}/recognize`)

    const document_ = response?.json?.document

    if (document_) {
        setDocumentRecognized(document_)
    }

    setIsLoading(false)

    setRecognitions(prev => prev > 0 ? prev - 1 : prev)

    return document_
}