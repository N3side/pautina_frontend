export function convertStorageUrl(url: string): string {
    if (url.includes('localhost:8876/storage/')) {
        return url.replace(
            'http://localhost:8876/storage/',
            'http://pautina.local/backend/storage/'
        );
    }
    return url;
}