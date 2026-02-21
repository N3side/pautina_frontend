import {convertStorageUrl} from "@/shared/lib/utils/urlHelper";

export async function download(url) {

    console.log(url)

    const response = await fetch(convertStorageUrl(url));

    const blob = await response.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = "certificate.jpg"
    link.click()

}