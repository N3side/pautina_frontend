import {useState} from 'react';
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import useCitySelect from "@/features/select-city/useCitySelect";
import {editCity} from "@/widgets/user/profile/ui/profile/api";
import {$fetch} from "@/shared/api/fetch";

export default function City({ next = () => {} }: { next: () => void }) {

    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const {input,city_id,city} = useCitySelect({
        city_local: "city",
        city_id_local: "city_id"
    })

    async function handleSubmit(e) {

        e.preventDefault()

        const result = editCity(city, city_id)

        const response = await $fetch("onboarding/city", {
            method: "PATCH",
            body: JSON.stringify(result[0]),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_);
            return;
        }

        next()
    }

    return (
        <div>
            <div className="flex flex-col gap-[15px] w-full">
                <h4 className="text-text-main font-bold">Из какого вы города?</h4>

                <p className="secondary text-text-muted">
                    Напишите и выберите город из списка (если введеного города в списке нет, мы примем его)
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full"
            >

                {/*форма выбора города из хука*/}
                {input}


                <ButtonLarge text={"Далее"}>
                    <></>
                </ButtonLarge>
            </form>
        </div>
    );
}