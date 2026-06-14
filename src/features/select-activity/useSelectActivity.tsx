"use client"

import Option from "@/shared/ui/Inputs/Option";
import Input from "@/shared/ui/Inputs/Input";
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import {UserContext} from "@/entities/user-entity";

interface Props {
    errors?: Record<string, any> | null
    localSelectedStatus?: any
    localSchoolStudyStatus?: any
    localDepartment?: any
    localCourse?: any
    localOrganization?: any
    localPost?: any
}

export function UseSelectActivity({
  errors,
  localSelectedStatus="",
  localSchoolStudyStatus="",
  localDepartment="",
  localCourse="",
  localOrganization="",
  localPost=""
}: Props) {

    const {user} = useContext(UserContext)

    const formRef = useRef<HTMLFormElement>(null);

    const [selectedStatus, setSelectedStatus] = useState<string | null>(user && user?.contacts?.status || localSelectedStatus && safeLocalStorage.getItem(`${localSelectedStatus}`) || "");
    const [schoolStudyStatus, setSchoolStudyStatus] = useState<string | null>(user && user?.contacts?.status || localSchoolStudyStatus && safeLocalStorage.getItem(`${localSchoolStudyStatus}`) || "");
    const [department, setDepartment] = useState<string>(user && user?.contacts?.department || localDepartment && safeLocalStorage.getItem(`${localDepartment}`) || "")
    const [course, setCourse] = useState<string>(user && user?.contacts?.course || localCourse && safeLocalStorage.getItem(`${localCourse}`) || "")
    const [organization, setOrganization] = useState<string>(user && user?.contacts?.organization || localOrganization && safeLocalStorage.getItem(`${localOrganization}`) || "")
    const [post, setPost] = useState<string>(user && user?.contacts?.post || localPost && safeLocalStorage.getItem(`${localPost}`) || "")

    useEffect(() => {
        safeLocalStorage.setItem(localSelectedStatus, `${selectedStatus}`)
    }, [selectedStatus]);

    useEffect(() => {
        safeLocalStorage.setItem(localSchoolStudyStatus, `${schoolStudyStatus}`)
    }, [schoolStudyStatus]);

    useEffect(() => {
        safeLocalStorage.setItem(localDepartment, department)
    }, [department]);

    useEffect(() => {
        safeLocalStorage.setItem(localCourse, course)
    }, [course]);

    useEffect(() => {
        safeLocalStorage.setItem(localOrganization, organization)
    }, [organization]);

    useEffect(() => {
        safeLocalStorage.setItem(localPost, post)
    }, [post]);

    const statusValue = selectedStatus === "null" || selectedStatus === "" ? null : selectedStatus;

    const activityTsx =
        <form className="flex flex-col gap-3" ref={formRef}>

            <div className="flex flex-row justify-start gap-3">
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

            <div className="flex flex-row gap-3 mt-5">
                {selectedStatus === "учусь" && (
                    <div className="flex gap-3 flex-col w-full">
                        <div className="flex flex-col gap-3 w-full">
                            {/*<div className="flex flex-col gap-3">*/}
                            {/*    <PautinaText variant={"default"} style={{ fontWeight: 700 }}>Кто вы?</PautinaText>*/}
                            {/*</div>*/}

                            <Option
                                selected={schoolStudyStatus == "Я школьник"}
                                text={"Я школьник"}

                                onClick={() => setSchoolStudyStatus("Я школьник")}
                            />
                            <Option
                                selected={schoolStudyStatus == "Я студент"}
                                text={"Я студент"}
                                onClick={() => setSchoolStudyStatus("Я студент")}
                            />

                            <span className="text-red-500 text-sm ml-1">
                                {errors?.department && errors?.course && !schoolStudyStatus ? "Выберите вариант ответа" : ""}
                            </span>
                        </div>

                        {schoolStudyStatus && (
                            <div className="flex flex-col gap-3">
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
                    </div>
                )}

                {selectedStatus === "работаю" && (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col gap-3 mt-5">
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
            </div>


        </form>

    return {
        statusValue,
        formRef,
        activityTsx,
        post,
        organization,
        course,
        department,
        schoolStudyStatus,
        selectedStatus,
    }
}