export function checkIsVideo(image_url: string): boolean {
    return Boolean(image_url?.match(/\.(mp4|webm|ogg|mov|avi)($|\?)/i))
}