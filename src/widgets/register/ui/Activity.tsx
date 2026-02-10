import React, {FormEvent, useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {$fetch} from "@/shared/api/fetch";
import {UseSelectActivity} from "@/features/select-activity/useSelectActivity";

// Описываем структуру возможных ошибок
interface FormErrors {
    department?: string;
    course?: string;
    organization?: string;
    post?: string;
    status?: string;
}

interface ActivityProps {
    next: () => void;
}

export default function Activity({ next }: ActivityProps) {

    const [errors, setErrors] = useState<FormErrors | null>(null);

    const {activityTsx, formRef, statusValue} = UseSelectActivity({errors, localSelectedStatus: "selectedStatus", localCourse: "course", localPost: "post", localOrganization: "organization", localSchoolStudyStatus: "schoolStudyStatus", localDepartment: "department"})

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        formData.set("status", `${statusValue}`);

        const response = await $fetch("onboarding/activity", {
            method: "PATCH",
            body: formData
        });

        const errors_ = response?.json?.errors as FormErrors | undefined;

        if (errors_) {
            setErrors(errors_);
            return;
        }

        next();
    }



    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
                <h4 className="text-text-main font-bold">
                    Чем Вы занимаетесь?
                </h4>
                <p className="text-secondary text-text-muted">
                    На нашем портале собрано множество интересных людей
                </p>
            </div>

            {activityTsx}

            <ButtonLarge text={"Далее"} onClick={handleSubmit}>
                <></>
            </ButtonLarge>
        </div>
    );
}