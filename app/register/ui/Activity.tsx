import { Heading } from "@/shared/cat/typography/headings";
import { PautinaText } from "@/shared/cat/typography/text";
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Option from "@/shared/components/Inputs/Option";
import Image from 'next/image';
import catIcon from '@/shared/raster/cat.png';
import catIcon2 from '@/shared/raster/cat2.png';
import Input from "@/shared/components/Inputs/Input";
import { $fetch } from "@/shared/api/fetch";

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
    // Используем строковые литералы для более строгой проверки
    const [selectedStatus, setSelectedStatus] = useState<string>(localStorage.getItem("selectedStatus"));
    const [schoolStudyStatus, setSchoolStudyStatus] = useState<string | null>(localStorage.getItem("schoolStudyStatus"));


    const [department, setDepartment] = useState<string>(localStorage.getItem("department") || "")
    const [course, setCourse] = useState<string>(localStorage.getItem("course") || "")
    const [organization, setOrganization] = useState<string>(localStorage.getItem("organization") || "")
    const [post, setPost] = useState<string>(localStorage.getItem("post") || "")



    const [errors, setErrors] = useState<FormErrors | null>(null);

    // Ссылка должна соответствовать HTML тегу form
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        // Если нужно отправить настоящий null в JSON (если API принимает JSON),
        // но FormData всегда преобразует значения в строки.
        // Если вы используете JSON.stringify(Object.fromEntries(formData)):
        const statusValue = selectedStatus === "null" || selectedStatus === "" ? null : selectedStatus;

        // В FormData записываем строку, так как FormData не поддерживает null типы
        formData.set("status", String(statusValue));

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




    useEffect(() => {
        localStorage.setItem("selectedStatus", selectedStatus)
    }, [selectedStatus]);

    useEffect(() => {
        localStorage.setItem("schoolStudyStatus", schoolStudyStatus)
    }, [schoolStudyStatus]);

    // ---

    useEffect(() => {
        localStorage.setItem("department", department)
    }, [department]);

    useEffect(() => {
        localStorage.setItem("course", course)
    }, [course]);

    useEffect(() => {
        localStorage.setItem("organization", organization)
    }, [organization]);

    useEffect(() => {
        localStorage.setItem("post", post)
    }, [post]);

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
                <Heading variant="h4">
                    Чем Вы занимаетесь?
                </Heading>
                <PautinaText variant={"secondary"}>
                    На нашем портале собрано множество интересных людей
                </PautinaText>
            </div>

            <form className="space-y-5" ref={formRef} onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <Option
                        selected={selectedStatus === "учусь"}
                        text={"учусь"}
                        onClick={() => setSelectedStatus("учусь")}
                    />
                    <Option
                        selected={selectedStatus === "работаю"}
                        text={"работаю"}
                        onClick={() => setSelectedStatus("работаю")}
                    />
                </div>

                {selectedStatus === "учусь" && (
                    <>
                        <div className="space-y-3">
                            <div className="flex flex-col gap-3">
                                <PautinaText variant={"default"} style={{ fontWeight: 700 }}>Кто вы?</PautinaText>
                                <Image src={catIcon} alt="Кот" width={100} height={100} />
                            </div>

                            <Option
                                selected={schoolStudyStatus === "Я школьник"}
                                text={"Я школьник"}
                                onClick={() => setSchoolStudyStatus("Я школьник")}
                            />
                            <Option
                                selected={schoolStudyStatus === "Я студент"}
                                text={"Я студент"}
                                onClick={() => setSchoolStudyStatus("Я студент")}
                            />

                            <span className="text-red-500 text-sm ml-1">
                                {errors?.department && errors?.course && !schoolStudyStatus ? "Выберите вариант ответа" : ""}
                            </span>
                        </div>

                        {schoolStudyStatus && (
                            <div className="space-y-3">
                                <Input
                                    label={"Название учебного заведение"}
                                    placeholder={schoolStudyStatus === "Я студент" ? "МЦК-КТИТС" : "Школа №169"}
                                    name={"department"}
                                    error={errors?.department}
                                    defaultValue={department}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartment(e?.target?.value)}
                                />
                                <Input
                                    label={schoolStudyStatus === "Я студент" ? "Курс" : "Класс"}
                                    placeholder={schoolStudyStatus === "Я студент" ? "3" : "9"}
                                    name={"course"}
                                    error={errors?.course}
                                    defaultValue={course}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCourse(e?.target?.value)}
                                />
                            </div>
                        )}
                    </>
                )}

                {selectedStatus === "работаю" && (
                    <div>
                        <div className="flex flex-col gap-3">
                            <PautinaText variant={"default"} style={{ fontWeight: 700 }}>Где работаете?</PautinaText>
                            <Image src={catIcon2} alt="Кот" width={100} height={100} />
                        </div>
                        <div className="space-y-3 mt-5">
                            <Input
                                label={"Организация"}
                                placeholder={"Паутина"}
                                name={"organization"}
                                error={errors?.organization}
                                defaultValue={organization}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOrganization(e?.target?.value)}
                            />
                            <Input
                                label={"Должность"}
                                placeholder={"UX/UI designer"}
                                name={"post"}
                                error={errors?.post}
                                defaultValue={post}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPost(e?.target?.value)}
                            />
                        </div>
                    </div>
                )}

                <ButtonLarge text={"Далее"} />
            </form>
        </div>
    );
}