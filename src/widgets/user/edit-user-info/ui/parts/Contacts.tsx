import {useHandleSubmit} from "@/widgets/user/edit-user-info/api/useHandleSubmit";
import {useContext, useRef} from "react";
import {UserContext} from "@/entities/user";
import useCitySelect from "@/features/select-city/useCitySelect";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input"
import {autoReplace} from "@/shared/lib/utils/replace";
import AccordionLayout from "@/shared/ui/Inputs/AccordionLayout";
import useSelectSource from "@/features/select-source/useSelectSource";
import {UseSelectActivity} from "@/features/select-activity/useSelectActivity";
import {underline} from "next/dist/lib/picocolors";

export default function Contacts({heading}) {

    const form_ = useRef(null)

    const {user} = useContext(UserContext)

    const {input, city, city_id} = useCitySelect({
        default_city: user?.contacts?.translated_city || user?.contacts?.city,
        default_city_id: user?.contacts?.city_id,
        city_local: "city",
        city_id_local: "city_id"
    })

    const {sourceTsx,result} = useSelectSource({errors: null})
    const {activityTsx, formRef, statusValue} = UseSelectActivity({errors: null})

    const {errors, handleSubmit} = useHandleSubmit({
        form_,
        city,
        city_id,
        formRef,
        result,
        statusValue
    })


    return (
        <form className="flex flex-col gap-5 relative" onSubmit={handleSubmit} ref={form_}>
            <div className="w-full flex flex-col">
                <div className='glass-effect py-8 px-6 rounded-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>

                    <div className="flex flex-col gap-4 mt-10">
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
                            name="tg"
                            label="Телеграм юзернейм"
                            defaultValue={user?.contacts?.tg}
                            error={errors?.tg}
                            isUsername={true}
                            onInput={autoReplace}
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

                        <ButtonLarge type="submit">
                            Сохранить
                        </ButtonLarge>
                    </div>


                </div>
            </div>
        </form>
    )
}