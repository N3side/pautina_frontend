import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import Input from "@/shared/ui/Inputs/Input";
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useContext, useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import Gallery from "@/entities/gallery/Gallery";
import EditGallery from "@/features/edit-gallery/EditGallery";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import ButtonOpener from "@/entities/buttons-opener/ButtonOpener";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {UserContext} from "@/entities/user";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {useRouter} from "next/navigation";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Props {
    task: Record<string, any>
    setTasks?: (any) => void
    className?: string
    redirectOnClick?: boolean
}

export default function Task({task, setTasks, className, redirectOnClick=true}: Props) {

    const {open, close, isOpen} = useModal()

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const form = useRef<HTMLFormElement>(null)

    const {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles,
        gallery,
        setGallery,
        flushTrash,
        sortPendings
    } = useGalleryLogic({
        entity: "task",
        isClientOnly: true,
        galleryInit: task?.images
    });

    async function updateTask(e, task_id) {

        e.preventDefault()

        if (!form?.current) {
            return
        }

        const formData = new FormData(form?.current)

        const response = await $fetch(`tasks/${task_id}`, {
            method: "PATCH",
            body: formData
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        const task_ = response?.json?.task

        uploadAllPendingFiles(task_id)
        flushTrash()

        if (task_) {
            if (setTasks) {
                setTasks(prev => {
                    const new_tasks = prev.filter(t => t.id !== task_id)
                    return [...new_tasks, task_]
                })
            }
            close()
        }

    }

    async function deleteTask(task_id) {
        const response = await $fetch(`tasks/${task_id}`, {
            method: "DELETE"
        })

        if (response?.response?.ok) {

            if (setTasks) {
                setTasks(prev => [...prev.filter(t => t.id !== task_id)])
            }
        }
    }

    const {user} = useContext(UserContext)

    const isMy = task?.user_id === user?.main?.id

    const expandedButtons = [
        isMy && {
            text: "Редактировать",
            Icon: EditIcon,
            onClick: () => open()
        },
        isMy && {
            text: "Удалить",
            Icon: DeleteIcon,
            onClick: () => openConfirm()
        },
        {
            text: "Открыть страницу задачи",
            Icon: OpenInNewIcon,
            onClick: () => router.replace(`/tasks/${task?.id}`)
        }
    ].filter(Boolean) as Record<string, any>[];

    const {isOpen: isOpenConfirm, open: openConfirm, close: closeConfirm} = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close: close,
        callback: () => deleteTask(task.id)
    })

    const router = useRouter()

    return (
        <div className={`rounded-2xl cursor-pointer flex flex-col items-end ${className}`} onClick={() => redirectOnClick && router.replace(`/tasks/${task?.id}`)}>

            <Modal isOpen={isOpenConfirm} close={closeConfirm} modalClassName="h-fit w-fit">
                <ConfirmationForm confirm={confirm} decline={decline} />
            </Modal>

            <div className="flex flex-col items-start w-full">
                <Gallery gallery={gallery} className="max-h-[300px] h-full" />

                <div className="flex items-center w-full justify-between">
                    <div className="flex flex-col mt-4">
                        <h5 className="text-text-main font-semibold">{task?.title}</h5>
                        <p className="text-text-muted">{task?.description}</p>
                    </div>
                    <ButtonOpener expandedButtons={expandedButtons} closeOnClick={true} />
                </div>

            </div>


            <Modal isOpen={isOpen} close={close} modalClassName="max-h-none max-w-none lg:max-h-[500px] lg:max-w-[750px] h-fit w-full">

                <div className="h-full w-full flex flex-col justify-between gap-4">
                    <h6 className="text-text-main font-bold">Редактировать задачу</h6>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <form className="mt-4 flex flex-col gap-2" ref={form} onSubmit={(e) => updateTask(e, task?.id)}>

                        <div className="flex items-center gap-2">
                            <h6 className="text-text-muted font-bold">Добавить файлы</h6>
                            <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} btnHeight={40} btnWidth={40} />
                        </div>

                        <EditGallery cards={gallery} onSortChange={sortPendings} setCards={setGallery} onDelete={handleDelete} />

                        <Input name="title" label="Заголовок" defaultValue={task?.title} error={errors?.title} />
                        <Textarea name="description" label="Описание" defaultValue={task?.description} error={errors?.description} />
                        <ActionButton text="Изменить" type="submit" />
                    </form>


                </div>

            </Modal>

        </div>
    )
}