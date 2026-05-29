// components/pages/UpdateProject/UpdateProject.tsx (или твой путь к странице/виджету)
"use client"

import { Checkbox } from "@mui/material";
import Input from "@/shared/ui/Inputs/Input";
import Textarea from "@/shared/ui/Inputs/Textarea";
import { useContext, useEffect, useRef, useState } from "react";
import DateInput from "@/shared/ui/Inputs/Date";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";

import { UserContext } from "@/entities/user";
import { $fetch } from "@/shared/api/fetch";
import { usePathname, useRouter } from "next/navigation";
import EditGallery from "@/features/edit-gallery/EditGallery";
import ShowStacks from "@/features/manage-stacks/ui/ShowStacks";
import { userLink } from "@/shared/lib/utils/userLink";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import { Modal } from "@/shared/ui/Modals/Modal";
import { useModal } from "@/shared/lib/hooks/useModal";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import ActionButton from "@/shared/ui/Buttons/ActionButton";

export default function UpdateProject() {
    const { user } = useContext(UserContext);

    // Локальные стейты сущности проекта
    const [project, setProject] = useState<Record<string, any> | null>(null);
    const [errors, setErrors] = useState<Record<string, any> | null>(null);
    const [checked, setChecked] = useState<boolean>(false);
    const [selectedStacks, setSelectedStacks] = useState<Record<string, any>[]>([]);
    const [gallery, setGallery] = useState<Record<string, any>[]>([]);

    const id = usePathname().split("/").pop();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    // Модалка удаления
    const {
        close: closeModalConfirmOperation,
        open: openModalConfirmOperation,
        isOpen: isOpenModalConfirmOperation
    } = useModal();

    const { confirm, decline } = UseConfirmOperation({
        close: closeModalConfirmOperation,
        callback: deleteProject
    });

    // Загрузка данных проекта
    async function getProject() {
        const response = await $fetch(`projects/${id}`);
        const project_ = response?.json?.project;

        if (project_) {
            setProject(project_);
        }
    }

    // Первоначальный запрос данных
    useEffect(() => {
        getProject();
    }, []);

    // Синхронизация стейтов при получении данных проекта с бэкенда
    useEffect(() => {
        if (project) {
            setChecked(Boolean(project.is_public));

            if (project.stacks && Array.isArray(project.stacks)) {
                setSelectedStacks(project.stacks);
            }
            if (project.gallery && Array.isArray(project.gallery)) {
                setGallery(project.gallery);
            }
        }
    }, [project]);

    // Обновление проекта
    async function updateProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(formRef.current || undefined);

        // Передаем статус приватности (0 или 1 для бэка на Laravel)
        formData.set("is_public", checked ? "1" : "0");

        // Безопасно упаковываем массив выбранных ID стеков в FormData
        if (selectedStacks && selectedStacks.length > 0) {
            selectedStacks.forEach(stack => {
                if (stack?.id) {
                    formData.append("stack_ids[]", stack.id.toString());
                }
            });
        }

        const response = await $fetch(`projects/${id}`, {
            method: "PATCH",
            body: formData
        });

        if (response?.response?.ok) {
            router.replace(userLink(user?.publication?.public_url));
        }
    }

    // Удаление проекта
    async function deleteProject() {
        const response = await $fetch(`projects/${id}`, { method: "DELETE" });
        if (response?.response?.ok) {
            router.replace(userLink(user?.publication?.public_url));
        }
    }

    return (
        <form className="relative flex flex-col w-full" ref={formRef} onSubmit={updateProject}>

            <h5 className="text-text-main font-bold mb-6">Изменить информацию о проекте</h5>

            <div className="flex flex-col gap-6 pb-8 w-full">

                {/* Основные поля ввода */}
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

                {/* Галерея проекта */}
                <div className="flex flex-col gap-4">
                    <div className="gap-2">
                        <h6 className="text-text-main font-bold">Добавить фотографии</h6>
                        <p className="text-text-muted text-small font-bold">{gallery?.length || 0} из 10</p>
                    </div>

                    <EditGallery
                        cards={gallery}
                        setCards={setGallery}
                    />
                </div>

                {/* Даты разработки */}
                <DateInput
                    name="start_date"
                    label="Дата начала разработки"
                    error={errors?.start_date}
                    defaultValue={project?.start_date}
                />

                <DateInput
                    name="end_date"
                    label="Дата окончания разработки"
                    error={errors?.end_date}
                    defaultValue={project?.end_date}
                />

                {/* Выбор стека технологий по архитектуре FSD */}
                <div className="glass-effect p-6 rounded-xl">
                    <ShowStacks
                        title="Нажмите на технологии, которые использовались в проекте"
                        showSearch={true}
                        showAll={true}
                        showSelected={true}
                        selectedStacks={selectedStacks}
                        setSelectedStacks={setSelectedStacks}
                    />
                </div>

                {/* Ссылки на продакшн и репозиторий */}
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

                {/* Чекбокс видимости */}
                <div className="flex items-center cursor-pointer select-none" onClick={() => setChecked(!checked)}>
                    <Checkbox checked={checked} className="!text-text-main"/>
                    <p className="text-text-muted font-semibold">Проект виден в вашем профиле другим людям</p>
                </div>

                {/* Модалка подтверждения удаления */}
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

                {/* Управляющие кнопки */}
                <div className="flex flex-col gap-2 mt-4">
                    <ButtonLarge type="submit">
                        Сохранить проект
                    </ButtonLarge>

                    <ActionButton type="button" onClick={openModalConfirmOperation}>
                        Удалить проект
                    </ActionButton>
                </div>

            </div>
        </form>
    );
}