interface CityPayload {
    city_id?: any;
    city?: string;
}

export function editCity(city: string | null, city_id: any): CityPayload[] {
    // Explicitly type the array here
    const result: CityPayload[] = [];

    if (city_id) {
        result.push({ city_id });
    } else if (city && city.trim()) {
        result.push({ city });
    }

    return result;
}