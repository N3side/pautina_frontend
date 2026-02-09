import Input from "@/shared/ui/Inputs/Input"
import {useContext, useRef, useState} from "react";
import {useModal} from "@/shared/ui/Modals/Modal";
import {Heading} from "@/shared/styles/typography/headings";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import toast from "react-hot-toast";
import useCitySelect from "@/features/select-city/useCitySelect";
import {unionFormData} from "@/shared/lib/utils/UnionFormData";
import {editCity} from "@/widgets/profile/ui/profile/api";
import {printFormData} from "@/shared/lib/utils/formData";

export default function useEditProfile() {

    const [errors, setErrors] = useState(null)

    const {user, setUser} = useContext(UserContext)

    const {input, city, city_id} = useCitySelect({
        default_city: user?.translated_city || user?.city,
        default_city_id: user?.city_id,
        city_local: "city",
        city_id_local: "city_id"
    })

    const formRef = useRef(null)

    const form =

    <>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={formRef}>

            <Heading variant="h5">
                Редактирование профиля
            </Heading>

            <Input
                name="username"
                label="Юзернейм в системе"
                defaultValue={user?.username}
                error={errors?.username}
                isUsername={true}
            />

            <Input
                name="name"
                label="Имя"
                defaultValue={user?.name}
                error={errors?.name}
            />

            <Input
                name="surname"
                label="Фамилия"
                defaultValue={user?.surname}
                error={errors?.surname}
            />

            <Input
                name="patronymic"
                label="Отчество"
                defaultValue={user?.patronymic}
                error={errors?.patronymic}
            />

            <Input
                name="phone"
                label="Номер телефона"
                mask="+7 (000) 000-00-00"
                defaultValue={user?.phone}
                error={errors?.phone}
            />

            <Input
                name="tg"
                label="Телеграм юзернейм"
                defaultValue={user?.tg}
                error={errors?.tg}
                isUsername={true}
            />

            <Input
                name="max"
                label="Макс юзернейм"
                defaultValue={user?.max}
                error={errors?.max}
                isUsername={true}
            />

            {input}


            <Input
                name="bio"
                label="О себе"
                defaultValue={user?.bio}
                error={errors?.bio}
            />

            {/*<div>*/}

            {/*    <PautinaText variant="tiny" className="uppercase text-text-muted mb-1 ml-1 font-semibold">*/}
            {/*        Откуда узнали о паутине?*/}
            {/*    </PautinaText>*/}

            {/*    <SourceSelectionForm />*/}

            {/*</div>*/}

            <ButtonLarge type="submit">
                Изменить
            </ButtonLarge>

        </form>
    </>


    const {modal,open,close} = useModal({
        children:
        <>{form}</>
    })

    async function handleSubmit(e) {
        e.preventDefault();

        setErrors(null)

        const formData = unionFormData(new FormData(formRef.current), [
            ...editCity(city, city_id)
        ])

        printFormData(formData)

        const updates = new FormData()

        let changed = false

        // Проходим по всем полям из формы
        for (const [key, value] of formData.entries()) {

            console.log(value, user?.[key])

            if (value !== String(user?.[key] ?? '')) {
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

    return {
        modalEdit: modal, openEdit: open, closeEdit: close
    }
}