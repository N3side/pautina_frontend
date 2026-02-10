import React, {useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import useSelectSource from "@/features/select-source/useSelectSource";
import {unionFormData} from "@/shared/lib/utils/UnionFormData";


export default function Source({next}) {
    const [errors, setErrors] = useState<Record<any, string> | null>(null)
    const {sourceTsx,result} = useSelectSource({errors})

    async function handleSubmit(e) {

        e.preventDefault()
        setErrors(null)

        const formData = unionFormData(new FormData, [result])

        const response = await $fetch("onboarding/source", {
            method: "PATCH",
            body: formData,
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        next()
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-4">
                <h4 className="text-text-main font-bold">
                    Откуда вы узнали о Паутине? *
                </h4>

                <p className="text-secondary text-text-muted">
                    Нам очень важно знать как развивается проект и понимать какие каналы продвижения являются эффективными. Поэтому, ответьте пожалуйста на эти вопросы
                </p>
            </div>

            <div className="font-bold text-[14px] ml-1">
                <p className="secondary font-bold text-text-muted">
                    Ответ
                </p>
            </div>

            {sourceTsx}

            <ButtonLarge text="Далее">
                <></>
            </ButtonLarge>
        </form>
    );
}