import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { ShadowWrapper } from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material";
import { COLORS, colorStyles } from "@/shared/styles/colors";
import { $fetch } from "@/shared/api/fetch";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useEffect, FormEvent } from 'react';
import {FetchResult} from "@/shared/api/fetch";

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
    const [city, setCity] = useState<string>(localStorage.getItem("city") || "");
    const [cityId, setCityId] = useState<any>(localStorage.getItem("city_id") || "");
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
            localStorage.setItem("city", city);
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
            localStorage.setItem("city_id", cityId);
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
                        value={city} // Используем value вместо inputValue
                        inputValue={city}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.name
                        }
                        onInputChange={(e, newValue) => {
                            setCity(newValue || ""); // Гарантируем, что это строка
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
                                placeholder="Введите город"
                                error={!!errors?.city || !!errors?.city_id}
                                helperText={errors?.city || errors?.city_id}
                            />
                        )}
                    />
                </div>

                <ShadowWrapper>
                    <Button
                        type="submit"
                        style={{
                            marginTop: "15px",
                            background: colorStyles.buttons.brand.light,
                            padding: "15px 0px",
                            borderRadius: "12px",
                            width: "100%",
                        }}
                    >
                        <PautinaText variant="button2" color={COLORS.white}>
                            Далее
                        </PautinaText>
                    </Button>
                </ShadowWrapper>
            </form>
        </div>
    );
}