import {$fetch} from "@/shared/api/fetch";

export async function updateDocument({e, setErrors, formRef, tags, checked, document_id}) {

    e.preventDefault()
    setErrors(null)

    const formData = new FormData(formRef.current)

    formData.set("categories", JSON.stringify(tags))

    console.log(tags)

    formData.set("is_public", String(checked))

    const response = await $fetch(`documents/${document_id}`, {
        method: "PATCH",
        body: formData
    })

    const errors_ = response?.json?.errors

    if (errors_) {
        setErrors(errors_)
        return
    }

    const documents = response?.json?.documents

    if (documents) {
        return documents
    }

}