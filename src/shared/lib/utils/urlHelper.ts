export function convertStorageUrl(url: string): string {
    if (url.includes('localhost:8876/storage/')) {
        return url.replace(
            'http://localhost:8876/storage/',
            'http://pautina.local/backend/storage/'
        );
    }
    return url;
}

export function normalizeUrl(url): string {
    if (!url) return "";

    // Убираем http:// или https:// если есть
    const cleanUrl = url.replace(/^https?:\/\//, '');

    return 'https://' + cleanUrl;
}