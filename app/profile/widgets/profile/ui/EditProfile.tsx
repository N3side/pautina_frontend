import Input from "@/shared/components/Inputs/Input"
import {RefObject, useContext, useRef, useState} from "react";
import {useModal} from "@/shared/components/Modal";
import {PautinaText} from "@/shared/cat/typography/text";
import {Heading} from "@/shared/cat/typography/headings";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import {UserContext} from "@/shared/providers/UserProvider";
import {$fetch} from "@/shared/api/fetch";

export default function useEditProfile() {

    const [errors, setErrors] = useState(null)

    const {user} = useContext(UserContext)

    const form_ = useRef<HTMLFormElement>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        const formData = new FormData(form_.current)

        const response = await $fetch("me/update", {
            method: "PATCH",
            body: formData
        })

    }

    const form =
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={form_}>

        <Heading variant="h5">
            Редактирование профиля
        </Heading>

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
            error={errors?.name}
        />

        <Input
            name="email"
            label="Почта"
            defaultValue={user?.email}
            error={errors?.name}
        />

        <Input
            name="phone"
            label="Номер телефона"
            mask="+7 (000) 000-00-00"
            defaultValue={user?.phone}
            error={errors?.name}
        />

        <Input
            name="tg"
            label="Телеграм юзернейм"
            defaultValue={user?.tg}
            error={errors?.name}
        />

        <Input
            name="max"
            label="Макс юзернейм"
            mask="@"
            defaultValue={user?.max}
            error={errors?.name}
        />

        <Input
            name="city"
            label="Город"
            defaultValue={user?.city}
            error={errors?.name}
        />

        <Input
            name="source"
            label="Откуда узнали"
            defaultValue={user?.source}
            error={errors?.name}
        />

        <ButtonLarge type="submit">
            Изменить
        </ButtonLarge>

    </form>

    const {modal,open,close} = useModal({
        children:
        <>{form}</>
    })

    return {
        modalEdit: modal, openEdit: open, closeEdit: close
    }
}