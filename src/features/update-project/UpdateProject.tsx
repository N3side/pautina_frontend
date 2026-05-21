"use client"

import {Button, Checkbox} from "@mui/material";
import Input from "@/shared/ui/Inputs/Input"
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useContext, useEffect, useRef, useState} from "react";
import Date from "@/shared/ui/Inputs/Date";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";

import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import {usePathname, useRouter} from "next/navigation";
import EditGallery from "@/features/edit-gallery/EditGallery";
import GetStacks from "@/features/get-stacks/GetStacks";
import {userLink} from "@/shared/lib/utils/userLink";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import ActionButton from "@/shared/ui/Buttons/ActionButton";

export default function UpdateProject() {

    const {user} = useContext(UserContext)

    const [project, setProject] = useState<Record<string, any> | null>(null)
    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const [checked, setChecked] = useState(project?.is_public)

    const id = usePathname().split("/").pop()

    async function getProject() {
        const response = await $fetch(`projects/${id}`)

        const project_ = response?.json?.project

        if (project_) {
            setProject(project_)
        }
    }

    const router = useRouter()
    const formRef = useRef<HTMLFormElement | null>(null)

    async function updateProject(e) {
        e.preventDefault()
        const formData = new FormData(formRef.current || undefined)
        formData.set("is_public", checked ? "1" : "0")

        let stacks_ids
        if (selectedStacks) {
            stacks_ids = selectedStacks.map(stack => stack?.id)
        }

        console.log(stacks_ids)

        if (stacks_ids && stacks_ids.length > 0) {
            stacks_ids.forEach(id => {
                formData.append("stack_ids[]", id); // Именно append и именно с []
            });
        }

        const response = await $fetch(`projects/${id}`, {
            method: "PATCH",
            body: formData
        })

        // if (response?.response?.ok) {
        //     router.replace(userLink(user?.publication?.public_url))
        // }
    }

    useEffect(() => {
        getProject()
    }, []);

    const {
        close: closeModalConfirmOperation,
        open: openModalConfirmOperation,
        isOpen: isOpenModalConfirmOperation
    } = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close: closeModalConfirmOperation,
        callback: deleteProject
    })

    async function deleteProject() {
        const response = await $fetch(`projects/${id}`, {method: "DELETE"})
        if (response?.response?.ok) {
            router.replace(userLink(user?.publication?.public_url))
        }
    }

    const [selectedStacks, setSelectedStacks] = useState<Record<string, any> | null>([])

    useEffect(() => {
        if (project && project?.stacks && Array.isArray(project?.stacks) && project?.stacks?.length > 0) {
            setSelectedStacks(project?.stacks)
        }
    }, [project]);

    const [gallery, setGallery] = useState<Record<string, any> | null>([])

    useEffect(() => {
        if (project && project?.gallery && Array.isArray(project?.gallery) && project?.gallery?.length > 0)
        setGallery(project?.gallery)
    }, [project]);

    return (
        <form className="relative flex flex-col w-full" ref={formRef} onSubmit={updateProject}>

            <h5 className="text-text-main font-bold mb-6">Изменить информацию о проекте</h5>

            <div className="flex flex-col gap-6 pb-8 w-full">

                <Input
                    name="name"
                    label="Имя проекта"
                    placeholder="todo list"
                    error={errors?.name}
                    defaultValue={project?.name}
                />

                <Textarea
                    name="description"
                    label="Описание проекта"
                    placeholder="Приложение для создание заметок"
                    error={errors?.description}
                    defaultValue={project?.description}
                />

                <div className="flex flex-col gap-4">
                    <div className="gap-2">
                        <h6 className="text-text-main font-bold">Добавить фотографии</h6>

                        <p className="text-text-muted text-small font-bold">{gallery?.length} из 10</p>
                    </div>

                    <EditGallery
                        cards={gallery}
                        setCards={setGallery}
                    />

                </div>

                <Date
                    name="start_date"
                    label="Дата начала разработки"
                    error={errors?.start_date}
                    defaultValue={project?.start_date}
                />

                <Date
                    name="end_date"
                    label="Дата окончания разработки"
                    error={errors?.end_date}
                    defaultValue={project?.end_date}
                />

                <div className="glass-effect p-6 rounded-xl">
                    <GetStacks
                        title="Нажмите на технологии, которые использовались в проекте"
                        selectedStacks={selectedStacks}
                        setSelectedStacks={setSelectedStacks}
                    />
                </div>


                <Input
                    name="link"
                    label="Ссылка"
                    defaultValue={project?.link}
                    error={errors?.link}
                    leftAdditional="https://"
                    additionalGap={16}
                />

                <Input
                    name="repo_link"
                    label="Ссылка на репозиторий"
                    defaultValue={project?.repo_link}
                    error={errors?.repo_link}
                    leftAdditional="https://"
                    additionalGap={16}
                />

                <div className="flex items-center cursor-pointer" onClick={() => setChecked(!checked)}>
                    <Checkbox checked={checked} className="!text-text-main"/>
                    <p className="text-text-muted font-semibold">Проект виден в вашем профиле другим людям</p>
                </div>

                <Modal
                    isOpen={isOpenModalConfirmOperation}
                    close={closeModalConfirmOperation}
                    modalClassName="lg:max-w-[500px] max-h-[350px]"
                >
                    <ConfirmationForm
                        confirm={confirm}
                        decline={decline}
                    />
                </Modal>

                <div className="flex flex-col gap-2">
                    <ButtonLarge>
                        Сохранить проект
                    </ButtonLarge>

                    <ActionButton onClick={() => openModalConfirmOperation()}>
                        Удалить проект
                    </ActionButton>
                </div>



            </div>

        </form>
    )
}