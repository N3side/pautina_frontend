import { Heading } from "@/shared/cat/typography/headings";
import { PautinaText } from "@/shared/cat/typography/text";
import { $fetch } from "@/shared/api/fetch";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useEffect, FormEvent } from 'react';
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

// Тип для города из API
interface CityOption {
    id: number | string;
    name: string;
}

// Тип для тела запроса
interface RequestBody {
    _method: string;
    city_id?: string;
    city?: string;
}

export default function City({ next }: { next: () => void }) {
    const [city, setCity] = useState<string>(safeLocalStorage.getItem("city") || "");
    const [cityId, setCityId] = useState<any>(safeLocalStorage.getItem("city_id") || "");
    const [cities, setCities] = useState<CityOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result: RequestBody = {
            _method: "PATCH",
        };

        if (cityId) {
            result.city_id = cityId;
        } else {
            if (city.trim()) {
                result.city = city;
            }
        }

        console.log(result);

        const response = await $fetch("onboarding/city", {
            method: "POST",
            body: JSON.stringify(result),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const errors_ = response?.json?.errors as Record<string, string[]> | undefined;

        if (errors_) {
            setErrors(errors_);
            return;
        }

        next();
    }

    useEffect(() => {
        if (city !== null && city !== undefined) {
            safeLocalStorage.setItem("city", city);
        }

        if (typeof city !== "string" || city.length < 2) {
            setCities([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            const response = await $fetch(`cities?city=${encodeURIComponent(city)}`);
            setCities((response?.json?.cities as CityOption[]) || []);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [city]);

    useEffect(() => {
        if (cityId !== null && cityId !== undefined) {
            safeLocalStorage.setItem("city_id", cityId);
        }
    }, [cityId]);

    return (
        <div>
            <div className="flex flex-col gap-[15px] w-full">
                <Heading variant="h4">Из какого вы города?</Heading>

                <PautinaText variant="secondary">
                    Напишите и выберите город из списка (если введеного города в списке нет, мы примем его)
                </PautinaText>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full"
            >
                <div className="flex flex-col gap-[8px]">

                    <label>
                        <PautinaText variant="secondary" style={{ fontWeight: 700 }}>
                            Город
                        </PautinaText>
                    </label>

                    <Autocomplete
                        freeSolo
                        options={cities}
                        loading={loading}
                        value={city}
                        inputValue={city}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.name
                        }
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            "& .MuiOutlinedInput-root": { padding: 0 },

                            // --- ПЕРЕКРАСКА КРЕСТИКА ---
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "var(--color-text-main)", // Замените на нужный цвет (например, из конфига Tailwind)
                            },
                            // Если нужно перекрасить и стрелочку выбора
                            "& .MuiAutocomplete-popupIndicator": {
                                color: "blue",
                            }
                        }}
                        onInputChange={(e, newValue) => {
                            setCity(newValue || "");
                            setCityId("");
                        }}
                        onChange={(e, newValue) => {
                            if (newValue === null || newValue === undefined) {
                                setCity("");
                                setCityId("");
                                return;
                            }

                            if (typeof newValue === "string") {
                                setCity(newValue);
                                setCityId("");
                            } else {
                                setCity(newValue.name || "");
                                setCityId(newValue?.id || "");
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Казань"
                                // Ваши стили контейнера (рамка, скругление)
                                className="!border !border-text-muted !rounded-xl !p-2"

                                // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
                                sx={{
                                    // Убираем внутреннюю обводку MUI, чтобы осталась только Tailwind
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                    },
                                    // Убираем внутренние отступы MUI контейнера, если они мешают
                                    "& .MuiOutlinedInput-root": {
                                        padding: 0,
                                    }
                                }}
                                // -------------------------

                                inputProps={{
                                    ...params.inputProps,
                                    // Стили самого текста внутри инпута
                                    // Добавил !h-full и !box-border для корректного отображения
                                    className:
                                        "!text-text-main !p-3 !placeholder:text-text-muted !h-full",
                                }}
                            />
                        )}
                    />
                </div>

                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}