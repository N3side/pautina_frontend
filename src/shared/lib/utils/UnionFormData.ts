export function unionFormData(formData: FormData, extra): FormData {

    extra.map((obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            formData.append(key, value as string | Blob)
        })
    })

    return formData;
}