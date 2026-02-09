
interface RequestBody {
    city_id?: string;
    city?: string;
}

export function editCity(city, city_id) {

    const result = [];

    if (city_id) {
        result.push({ city_id });
    } else if (city && city.trim()) {
        result.push({ city });
    }

    return result;
}