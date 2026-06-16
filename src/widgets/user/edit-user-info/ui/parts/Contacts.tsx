import {useContext, useRef, useState} from "react";
import {UserContext} from "@/entities/user";
import useCitySelect from "@/features/select-city/useCitySelect";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input"
import {autoReplace} from "@/shared/lib/utils/replace";
import AccordionLayout from "@/shared/ui/Inputs/AccordionLayout";
import useSelectSource from "@/features/select-source/useSelectSource";
import {UseSelectActivity} from "@/features/select-activity/useSelectActivity";
import {unionFormData} from "@/shared/lib/utils/UnionFormData";
import {editCity} from "@/widgets/user/profile/ui/profile/api";
import {$fetch} from "@/shared/api/fetch";

export default function Contacts({heading}) {

    const form_ = useRef(null)

    const {user, setUser} = useContext(UserContext)

    const {input, city, city_id} = useCitySelect({
        default_city: user?.contacts?.translated_city || user?.contacts?.city,
        default_city_id: user?.contacts?.city_id,
        city_local: "city",
        city_id_local: "city_id"
    })

    const {sourceTsx,result} = useSelectSource({errors: null})
    const {activityTsx, formRef, statusValue} = UseSelectActivity({errors: null})

    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        const activityFormData = formRef && formRef.current
            ? Object.fromEntries(new FormData(formRef.current))
            : {};

        const formData = unionFormData(new FormData(form_.current!), [
            ...editCity(city, city_id),
            result,
            activityFormData
        ])

        formData.set("status", `${statusValue}`);

        const response = await $fetch("me/update/contacts", {
            method: "PATCH",
            body: formData
        });

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        const user_ = response?.json?.user

        if (user_) {
            setUser(user_)
        }

    }


    return (
        <form className="flex flex-col gap-5 relative" onSubmit={handleSubmit} ref={form_}>
            <div className="w-full flex flex-col">
                <div className='glass-effect py-8 px-6 rounded-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>

                    <div className="flex flex-col gap-4 mt-6">
                        {input}

                        <Input
                            name="phone"
                            label="Номер телефона"
                            placeholder="+7 (999) 999-99-99"
                            mask="+7 (000) 000-00-00"
                            defaultValue={user?.contacts?.phone}
                            error={errors?.phone}
                        />

                        <Input
                            name="vk"
                            label="Юзернейм вконтакте"
                            defaultValue={user?.contacts?.vk}
                            error={errors?.vk}
                            leftAdditional="https://vk.com/"
                            additionalGap={16}
                            onInput={autoReplace}
                        />

                        <Input
                            name="tg"
                            label="Юзернейм телеграмм"
                            defaultValue={user?.contacts?.tg}
                            error={errors?.tg}
                            leftAdditional="@"
                            additionalGap={20}
                            onInput={autoReplace}
                        />

                        <Input
                            name="github"
                            label="Юзернейм github"
                            defaultValue={user?.contacts?.github}
                            error={errors?.github}
                            leftAdditional="https://github.com/"
                            additionalGap={16}
                            onInput={autoReplace}
                        />

                        <Input
                            name="extra_link"
                            label="Сайт"
                            defaultValue={user?.contacts?.extra_link}
                            error={errors?.extra_link}
                        />

                        {/*<AccordionLayout>*/}
                        {/*    <AccordionLayout.Header className="px-1.25 py-4">*/}
                        {/*        <p className="text-text-default font-semibold">Откуда вы узнали о паутине?</p>*/}
                        {/*    </AccordionLayout.Header>*/}

                        {/*    <AccordionLayout.Content className="px-4 py-6">*/}
                        {/*        {sourceTsx}*/}
                        {/*    </AccordionLayout.Content>*/}
                        {/*</AccordionLayout>*/}

                        <AccordionLayout>
                            <AccordionLayout.Header className="px-1.25 py-4">
                                <p className="text-text-default font-semibold">Чем вы занимаетесь?</p>
                            </AccordionLayout.Header>

                            <AccordionLayout.Content className="px-4 py-6">
                                {activityTsx}
                            </AccordionLayout.Content>
                        </AccordionLayout>

                        <ButtonLarge type="submit" className="!text-white !font-bold !text-small">
                            Сохранить
                        </ButtonLarge>
                    </div>


                </div>
            </div>
        </form>
    )
}