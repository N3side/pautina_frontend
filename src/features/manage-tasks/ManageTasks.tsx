import ActionButton from "@/shared/ui/Buttons/ActionButton";
import AddIcon from '@mui/icons-material/Add';
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import Input from "@/shared/ui/Inputs/Input";
import Textarea from "@/shared/ui/Inputs/Textarea";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {$fetch} from "@/shared/api/fetch";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import Task from "@/entities/Task/Task";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import EditGallery from "@/features/edit-gallery/EditGallery";

export default function ManageTasks() {

    const id = usePathname().split("/").pop()

    const {open, close, isOpen} = useModal()

    const form = useRef<HTMLFormElement>(null)

    const [tasks, setTasks] = useState<Record<string, any>[]>([])

    const {perPage, lastPage, page, setPage, setPerPage, setLastPage} = UsePaginate()

    async function getTasks(event_id) {
        const response = await $fetch(`events/${event_id}/tasks`)

        const tasks_ = response?.json?.tasks
        const per_page = response?.json?.per_page
        const last_page = response?.json?.last_page

        if (tasks_) {
            setTasks(tasks_)
        }
        if (per_page) {
            setPerPage(per_page)
        }
        if (last_page) {
            setLastPage(last_page)
        }

    }

    useEffect(() => {
        if (id) getTasks(id)
    }, [id]);

    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    const {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles,
        gallery,
        setGallery,
        removeFile,
        addFile,
    } = useGalleryLogic({
        entity: "task",
        isClientOnly: true
    });

    async function createTask(e, event_id) {
        e.preventDefault()

        if (!form?.current) {
            return
        }

        const formData = new FormData(form?.current)

        const response = await $fetch(`events/${event_id}/tasks`, {
            method: "POST",
            body: formData
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        const task_ = response?.json?.task

        if (task_) {
            setTasks(prev => [...prev, {...task_, images: []}])
            await uploadAllPendingFiles(task_?.id)

            setTasks(prev =>
                prev.map(t =>
                    t.id === task_.id
                        ? {...t, images: gallery}
                        : t
                )
            )

            await close()
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full">

            <Modal isOpen={isOpen} close={close} modalClassName="max-h-none max-w-none lg:max-h-[600px] lg:max-w-[800px] h-full w-full">
                <h6 className="text-text-main font-bold">Создание задачи</h6>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <form className="mt-4 flex flex-col gap-4" ref={form} onSubmit={(e) => createTask(e, id)}>
                    <div className="flex items-center gap-2">
                        <h6 className="text-text-muted font-bold">Добавить файлы</h6>
                        <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} btnHeight={40} btnWidth={40} />
                    </div>

                    <EditGallery cards={gallery} setCards={setGallery} onDelete={handleDelete} />

                    <Input name="title" label="Заголовок" error={errors?.title} />
                    <Textarea name="description" label="Описание" error={errors?.description} />
                    <ButtonLarge text="Создать" type="submit" />
                </form>

            </Modal>

            <div className="glass-effect w-full p-6 rounded-2xl flex flex-col gap-4">
                <h6 className="text-text-main font-bold">Задачи для участников</h6>
                <ActionButton Icon={AddIcon} className="w-fit" text="Добавить задачу" onClick={open} />
            </div>

            {tasks && Array.isArray(tasks) && tasks.length > 0 &&
                <div className="glass-effect w-full p-6 rounded-2xl flex flex-col gap-8">
                    {tasks?.map(task =>
                        <Task key={task?.id} task={task} setTasks={setTasks} redirectOnClick={false} />
                    )}
                </div>
            }

        </div>

    )
}