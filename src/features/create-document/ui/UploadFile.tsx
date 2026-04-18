import FileInput from "@/shared/ui/Inputs/FileInput";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {$fetch} from "@/shared/api/fetch";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";


export default function UploadFile({setDocuments}) {

    const [selectedFile, setSelectedFile] = useState(null)
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        if (!selectedFile) {
            toast.error("Надо выбрать файл")
            return
        }

        const formData = new FormData()
        formData.set("file", selectedFile)

        const response = await $fetch("documents", {
            method: "POST",
            body: formData
        })

        const document_id = response?.json?.document_id
        const documents = response?.json?.documents

        if (document_id?.length > 0) {
            setDocuments(documents)
        }

        if (document_id) {
            router.push(`/edit/document/${document_id}`)
        }
    }

    return (
        <form className="flex flex-col gap-5 h-full" onSubmit={handleSubmit}>

            <h5 className="text-text-main font-bold">Прикрепите файл</h5>

            <div className="flex-1 flex items-center h-full">
                <FileInput
                    onChange={(file: null) => setSelectedFile(file)}
                    name="file"
                />
            </div>

            <ButtonLarge>
                Дальше
            </ButtonLarge>
        </form>
    )
}