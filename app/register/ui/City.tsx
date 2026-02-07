import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { $fetch } from "@/shared/api/fetch";

import { useState, useEffect, FormEvent } from 'react';
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import useCitySelect from "@/shared/components/Inputs/useCitySelect";

// Тип для тела запроса
interface RequestBody {
    _method: string;
    city_id?: string;
    city?: string;
}

export default function City({ next = () => {} }: { next: () => void }) {


    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const {input,cityId,city} = useCitySelect({
        city_local: "city",
        city_id_local: "city_id"
    })

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result: RequestBody = {
            _method: "PATCH",
        };

        if (cityId) {
            result.city_id = `${cityId}`;
        } else {
            if (city.trim()) {
                result.city = city;
            }
        }

        console.log(result)

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

                {input}


                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}