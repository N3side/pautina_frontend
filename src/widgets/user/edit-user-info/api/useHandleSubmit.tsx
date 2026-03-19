import {$fetch} from "@/shared/api/fetch";
import {unionFormData} from "@/shared/lib/utils/UnionFormData";
import {editCity} from "@/widgets/user/profile/ui/profile/api";
import toast from "react-hot-toast";
import {useContext, useState} from "react";
import {UserContext} from "@/entities/user";


interface Props {
    formRef?: any,
    form_: any,
    city?: any,
    city_id?: any,
    statusValue?: any,
    result?: any,
}

export function useHandleSubmit({formRef, form_, city, city_id, statusValue, result }: Props) {

    const {user, setUser} = useContext(UserContext)

    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(null)

        const activityFormData = formRef && formRef.current
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

    return {handleSubmit, errors}
}