import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { ShadowWrapper } from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material";
import { COLORS, colorStyles } from "@/shared/styles/colors";
import { useEffect, useState, FormEvent, ChangeEvent, SyntheticEvent } from "react";
import { $fetch } from "@/shared/api/fetch";

import Autocomplete, { AutocompleteChangeReason, AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

interface CityProps {
    next: () => void;
}

interface CityOption {
    id: string | number;
    name: string;
}

interface CityResponse {
    json?: {
        errors?: {
            city?: string;
            city_id?: string;
            [key: string]: string;
        };
        cities?: CityOption[];
    };
}

interface CityFormData {
    _method: string;
    city?: string;
    city_id?: string;
}

interface FormErrors {
    city?: string;
    city_id?: string;
    [key: string]: string | undefined;
}

export default function City({ next }: CityProps) {
    // Инициализируем состояния
    const [city, setCity] = useState<string>("")
    const [cityId, setCityId] = useState<string>("")
    const [cities, setCities] = useState<CityOption[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<FormErrors | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (typeof window !== 'undefined') {
            setCity(localStorage.getItem("city") || "")
            setCityId(localStorage.getItem("city_id") || "")
        }
    }, [])

    useEffect(() => {
        if (!isMounted) return

        if (typeof window !== 'undefined' && city !== null && city !== undefined) {
            localStorage.setItem("city", city)
        }

        if (typeof city !== "string" || city.length < 2) {
            setCities([])
            return
        }

        const timeout = setTimeout(async () => {
            setLoading(true)
            const response = await $fetch(`cities?city=${encodeURIComponent(city)}`) as CityResponse
            setCities(response?.json?.cities || [])
            setLoading(false)
        }, 500)

        return () => clearTimeout(timeout)
    }, [city, isMounted])

    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return

        if (cityId !== null && cityId !== undefined) {
            localStorage.setItem("city_id", cityId)
        }
    }, [cityId, isMounted])

    if (!isMounted) return null

    // остальной код компонента...
}