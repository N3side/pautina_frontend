"use client"

import { useEffect, useState } from 'react';
import { safeLocalStorage } from "@/shared/lib/utils/safeLocalStorage";
import { $fetch } from "@/shared/api/fetch";
import { AsyncCombobox, ComboboxOption } from "@/shared/ui/AsyncCombobox/AsyncCombobox";

// Иконка специфичная для города (оставляем здесь, так как она для EmptyState)
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const syncLocalStorage = (key: string, value: string) => {
    if (!key) return;
    if (value && value.trim().length > 0) {
        safeLocalStorage.setItem(key, value);
    } else {
        safeLocalStorage.removeItem(key);
    }
};

interface UseCitySelectProps {
    city_local?: string;
    city_id_local?: string;
    default_city?: string;
    default_city_id?: string | number;
}

export default function useCitySelect({
                                          city_local = "",
                                          city_id_local = "",
                                          default_city = "",
                                          default_city_id = ""
                                      }: UseCitySelectProps = {}) {

    const [city, setCity] = useState<string>(() => {
        if (default_city) return default_city;
        return safeLocalStorage.getItem(city_local) || "";
    });

    const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(() => {
        if (default_city && default_city_id) return { id: default_city_id, name: default_city };
        const savedId = safeLocalStorage.getItem(city_id_local);
        if (savedId && city) return { id: savedId, name: city };
        return null;
    });

    const [cities, setCities] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);

    // Обработка дефолтов
    useEffect(() => {
        if (default_city && default_city !== city) {
            setCity(default_city);
            syncLocalStorage(city_local, default_city);
        }
        if (default_city_id) {
            setSelectedCity({ id: default_city_id, name: default_city });
            if (city_id_local) safeLocalStorage.setItem(city_id_local, `${default_city_id}`);
        }
    }, [default_city, default_city_id]);

    // Синхронизация с LS
    useEffect(() => syncLocalStorage(city_local, city), [city, city_local]);
    useEffect(() => {
        if (city_id_local) {
            if (selectedCity?.id) safeLocalStorage.setItem(city_id_local, `${selectedCity.id}`);
            else safeLocalStorage.removeItem(city_id_local);
        }
    }, [selectedCity, city_id_local]);

    // Дебаунс и запрос (Бизнес-логика)
    useEffect(() => {
        if (!city || city.length < 2) {
            setCities([]);
            return;
        }
        if (selectedCity && city === selectedCity.name) return;

        const timeout = setTimeout(async () => {
            setLoading(true);
            const response = await $fetch(`cities?city=${encodeURIComponent(city)}`);
            setCities((response?.json?.cities as ComboboxOption[]) || []);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [city, selectedCity]);

    const handleClear = () => {
        setCity("");
        setSelectedCity(null);
        setCities([]);
    };

    // Специфичный для городов Empty State
    const CityEmptyState = (
        <div className="relative cursor-default select-none py-6 px-4 text-text-muted text-center flex flex-col items-center gap-3">
            <div className="p-3 bg-gray-50 rounded-full">
                <MapPinIcon className="w-6 h-6 opacity-40" />
            </div>
            <span className="text-sm">Город <span className="font-medium text-text-main">{city}</span> не найден</span>
        </div>
    );

    const input = (
        <AsyncCombobox
            label="Город"
            placeholder="Например: Москва"
            inputValue={city}
            selectedOption={selectedCity}
            options={cities}
            isLoading={loading}
            onInputChange={(val) => {
                setCity(val);
                if (selectedCity && val !== selectedCity.name) setSelectedCity(null);
            }}
            onChange={(item) => {
                setSelectedCity(item);
                if (item) setCity(item.name);
            }}
            onClear={handleClear}
            emptyState={CityEmptyState}
        />
    );

    return {
        input,
        city,
        city_id: selectedCity?.id || (city === default_city ? default_city_id : undefined)
    };
}