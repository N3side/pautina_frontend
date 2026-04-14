import FileInput from "@/shared/ui/Inputs/FileInput";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {$fetch} from "@/shared/api/fetch";
import {useRef} from "react";
import {useRouter} from "next/navigation";


export default function UploadFile({setDocuments}) {

    const ref = useRef<HTMLFormElement>(null)

    const router = useRouter()

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

        if (document_id.length > 0) {
            setDocuments(documents)
        }

        if (document_id) {
            router.push(`/edit/document/${document_id}`)
        }
    }

    return (
        <form className="flex flex-col gap-5 h-full" onSubmit={handleSubmit} ref={ref}>

            <h5 className="text-text-main font-bold">Прикрепите файл</h5>

            {/*<WarningProgressBar />*/}

            <div className="flex-1 flex items-center h-full">
                <FileInput onChange={() => {}} name="file" />
            </div>

            <ButtonLarge>
                Дальше
            </ButtonLarge>
        </form>
    )
}