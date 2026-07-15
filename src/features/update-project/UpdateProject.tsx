// components/pages/UpdateProject/UpdateProject.tsx (или твой путь к странице/виджету)
"use client"

import Input from "@/shared/ui/Inputs/Input";
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useContext, useEffect, useRef, useState} from "react";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";

import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import {usePathname, useRouter} from "next/navigation";
import EditGallery from "@/features/edit-gallery/EditGallery";
import ShowStacks from "@/features/manage-stacks/ui/ShowStacks";
import {userLink} from "@/shared/lib/utils/userLink";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import DateInput from "@/shared/ui/Inputs/Date";
import {toDate} from "@/shared/lib/utils/time";

export default function UpdateProject() {
    const { user } = useContext(UserContext);

    // Локальные стейты сущности проекта
    const [project, setProject] = useState<Record<string, any> | null>(null);
    const [errors, setErrors] = useState<Record<string, any> | null>(null);
    const [checked, setChecked] = useState<boolean>(true);
    const [selectedStacks, setSelectedStacks] = useState<Record<string, any>[]>([]);

    const id: string = usePathname().split("/").pop() || "";
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

        console.log(project_)
        if (project_) {
            setProject(project_);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

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
            await uploadAllPendingFiles(id);
        }
    }

    // Удаление проекта
    async function deleteProject() {
        const response = await $fetch(`projects/${id}`, { method: "DELETE" });
        if (response?.response?.ok) {
            router.replace(userLink(user?.main?.short_id));
        }
    }

    const {handleTriggerSelect, gallery, setGallery, fileInputRef, handleFileChange, uploadAllPendingFiles, handleDelete, sortPendings} = useGalleryLogic({
        entity: "project",
        isClientOnly: true,
        existingEntityId: id,
        galleryInit: project?.gallery
    })

    return (
        <form className="relative flex flex-col w-full" ref={formRef} onSubmit={updateProject}>

            <h5 className="text-text-main font-bold mb-6">Изменить информацию о проекте</h5>

            <div className="flex flex-col gap-6 w-full">

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*, video/*"
                    className="hidden"
                />

                {/* Основные поля ввода */}
                <Input
                    name="title"
                    label="Имя проекта"
                    placeholder="Название"
                    error={errors?.name}
                    defaultValue={project?.title}
                />

                <Textarea
                    name="description"
                    label="Описание проекта"
                    placeholder="Описание"
                    error={errors?.description}
                    defaultValue={project?.description}
                />

                <div className="flex flex-col gap-4">

                    <div>
                        <div className="flex gap-3 items-center">
                            <h6 className="text-text-main font-bold">Добавить фотографии</h6>
                            <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} hitboxWidth={40} hitboxHeight={40} />
                        </div>
                        {/*{gallery?.length > 0 &&*/}
                            <p className="text-text-muted text-small font-bold">{gallery?.length || 0} из 10</p>
                        {/*}*/}
                    </div>

                    <EditGallery
                        cards={gallery}
                        setCards={setGallery}
                        onSortChange={sortPendings}
                        onDelete={handleDelete}
                    />

                </div>

                <ShowStacks
                    showSearch={true}
                    showAll={true}
                    showSelected={true}
                    selectedStacks={selectedStacks}
                    setSelectedStacks={setSelectedStacks}

                    baseUrl="stacks"
                />

                <Input
                    name="link"
                    label="Ссылка"
                    defaultValue={project?.link}
                    error={errors?.link}
                />

                <DateInput
                    name="start_date"
                    label="Начало разработки"
                    defaultValue={project?.start_date}
                    error={errors?.start_date}
                />

                <DateInput
                    name="end_date"
                    label="Конец разработки (Оставьте пустым, если разработка еще не закончилась)"
                    defaultValue={project?.end_date}
                    error={errors?.end_date}
                />

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
                <div className="flex flex-col gap-2">
                    <ButtonLarge type="submit">
                        Сохранить проект
                    </ButtonLarge>

                    <ActionButton type="button" onClick={openModalConfirmOperation}>
                        <p className="text-text-muted font-semibold text-small">
                            Удалить проект
                        </p>
                    </ActionButton>
                </div>

            </div>
        </form>
    );
}