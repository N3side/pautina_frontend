"use client"

import Input from "@/shared/ui/Inputs/Input"
import React, {useContext, useRef, useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {UserContext} from "@/entities/user-entity";
import {$fetch} from "@/shared/api/fetch";
import toast from "react-hot-toast";
import useCitySelect from "@/features/select-city/useCitySelect";
import {unionFormData} from "@/shared/lib/utils/UnionFormData";
import {editCity} from "@/widgets/user/profile/ui/profile/api";
import AccordionLayout from "@/shared/ui/Inputs/AccordionLayout";
import useSelectSource from "@/features/select-source/useSelectSource";
import {UseSelectActivity} from "@/features/select-activity/useSelectActivity";
import {autoReplace} from "@/shared/lib/utils/replace";

interface Props {
    enabled?: boolean
    close: () => void
}

export default function EditProfileForm({enabled=true, close}: Props) {

    if (!enabled) return null

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const {user, setUser} = useContext(UserContext)

    const {input, city, city_id} = useCitySelect({
        default_city: user?.contacts?.translated_city || user?.contacts?.city,
        default_city_id: user?.city_id,
        city_local: "city",
        city_id_local: "city_id"
    })

    const form_ = useRef<HTMLFormElement>(null)

    const {sourceTsx,result} = useSelectSource({errors: errors || undefined})
    const {activityTsx, formRef, statusValue} = UseSelectActivity({errors})

    async function handleSubmit(e) {
        e.preventDefault();

        setErrors(null)

        const activityFormData = formRef.current
            ? Object.fromEntries(new FormData(formRef.current))
            : {};

        const formData = unionFormData(new FormData(form_.current!), [
            ...editCity(city, city_id),
            result,
            activityFormData
        ])

        formData.set("status", `${statusValue}`);

        const updates = new FormData()

        let changed = false

        for (const [key, value] of formData.entries()) {

            if (value !== String((user?.main?.[key] ?? '') || (user?.contacts?.[key] ?? "") || (user?.access?.[key] ?? ""))) {
                updates.append(key, value);
                changed = true
            }

        }

        if (!changed) {
            close()
            toast.success("Вы ничего не поменяли")
            return
        }

        // Отправляем только измененные поля
        const response = await $fetch("me/update", {
            method: "PATCH",
            body: updates
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
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit} ref={form_}>

            <h5 className="font-bold text-text-main">
                Редактирование профиля
            </h5>

            <Input
                name="username"
                label="Юзернейм в системе"
                defaultValue={user?.main?.username}
                error={errors?.username}
                leftAdditional="@"
                onInput={autoReplace}
            />

            <Input
                name="name"
                label="Имя"
                defaultValue={user?.main?.name}
                error={errors?.name}
            />

            <Input
                name="surname"
                label="Фамилия"
                defaultValue={user?.main?.surname}
                error={errors?.surname}
            />

            <Input
                name="patronymic"
                label="Отчество"
                defaultValue={user?.main?.patronymic}
                error={errors?.patronymic}
            />

            <Input
                name="phone"
                label="Номер телефона"
                mask="+7 (000) 000-00-00"
                defaultValue={user?.contacts?.phone}
                error={errors?.phone}
            />

            {/*<Input*/}
            {/*    name="tg"*/}
            {/*    label="Телеграм юзернейм"*/}
            {/*    defaultValue={user-entity?.contacts?.tg}*/}
            {/*    error={errors?.tg}*/}
            {/*    isUsername={true}*/}
            {/*    onInput={autoReplace}*/}
            {/*/>*/}

            <Input
                name="max"
                label="Макс юзернейм"
                defaultValue={user?.contacts?.max}
                error={errors?.max}
                leftAdditional="@"
                onInput={autoReplace}
            />

            {input}


            <Input
                name="bio"
                label="О себе"
                defaultValue={user?.main?.bio}
                error={errors?.bio}
            />

            <AccordionLayout>
                <AccordionLayout.Header className="px-1.25 py-4">
                    <p className="text-text-default font-semibold">Откуда вы узнали о паутине?</p>
                </AccordionLayout.Header>

                <AccordionLayout.Content className="px-4 py-6">
                    {sourceTsx}
                </AccordionLayout.Content>
            </AccordionLayout>

            <AccordionLayout>
                <AccordionLayout.Header className="px-1.25 py-4">
                    <p className="text-text-default font-semibold">Чем вы занимаетесь?</p>
                </AccordionLayout.Header>

                <AccordionLayout.Content className="px-4 py-6">
                    {activityTsx}
                </AccordionLayout.Content>
            </AccordionLayout>

            <ButtonLarge type="submit">
                Изменить
            </ButtonLarge>

        </form>
    )
}