import FileInput from "@/shared/ui/Inputs/FileInput";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {$fetch} from "@/shared/api/fetch";
import {Dispatch, SetStateAction, useRef} from "react";


interface UploadFileProps {
    setDocuments: Dispatch<SetStateAction<any[]>>
    setDocumentId: Dispatch<SetStateAction<string | null>>
    next: () => void
    prev: () => void
    close: () => void
}

export default function UploadFile({setDocuments, setDocumentId, next, close}: UploadFileProps) {

    const ref = useRef<HTMLFormElement>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        if (!ref?.current) {
            return
        }

        const formData = new FormData(ref.current)

        const response = await $fetch("documents", {
            method: "POST",
            body: formData
        })

        const document_id = response?.json?.document_id

        const documents = response?.json?.documents
        setDocuments(documents)

        if (document_id) {
            setDocumentId(document_id)
            next()
        }
    }

    return (
        <form className="flex flex-col gap-5 h-full" onSubmit={handleSubmit} ref={ref}>

            <h5 className="text-text-main font-bold">Прикрепите файл</h5>

            <div className="flex-1 flex items-center">
                <FileInput onChange={() => {}} name="file" className="h-full" />
            </div>

            <ButtonLarge>
                Дальше
            </ButtonLarge>
        </form>
    )
}