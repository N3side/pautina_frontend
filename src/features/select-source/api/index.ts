import { $fetch } from "@/shared/api/fetch";
import { Source } from "../model/types";

interface SourcesResponse {
    json?: {
        sources?: Source[];
    };
}

export const fetchSourcesList = async (): Promise<Source[]> => {
    try {
        const response = await $fetch("sources") as SourcesResponse;
        return response?.json?.sources || [];
    } catch (error) {
        console.error("Failed to fetch sources", error);
        return [];
    }
};