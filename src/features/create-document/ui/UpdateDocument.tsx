"use client"

import {Button, Checkbox} from "@mui/material";
import Input from "@/shared/ui/Inputs/Input"
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useContext, useEffect, useRef, useState} from "react";
import Date from "@/shared/ui/Inputs/Date";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import useTags from "@/entities/tags/lib/useTags";
import Circle from "@/shared/ui/Buttons/Circle"
import AddIcon from '@mui/icons-material/Add';
import LoadingOverlay from "@/shared/ui/Overlays/LoadingOverlay";
import {deleteDocument} from "@/entities/admin/document/api/delete"
import {updateDocument} from "@/entities/admin/document/api/update";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import {useModal} from "@/shared/lib/hooks/useModal";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {Modal} from "@/shared/ui/Modals/Modal";
import {UserContext} from "@/entities/user-entity";
import {$fetch} from "@/shared/api/fetch";
import {useRouter} from "next/navigation";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import ShowTags from "@/entities/tags/ui/showTags";
import {DraggableWrapper} from "@/shared/ui/DraggableWrapper/DragableWrapper";
import RecognizeButton from "@/shared/ui/Buttons/RecognizeButton";
import toast from "react-hot-toast";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

interface Props {
    document_values?: Record<string, any> | null
    document_id: string
}

export default function UpdateDocument({document_values, document_id}: Props) {

    const router = useRouter()

    const {user} = useContext(UserContext)

    const [document, setDocument] = useState<Record<string, any> | null>(null)
    const key = `draft;${document_id}`
    const [draftDocument, setDraftDocument] = useState<Record<string, any> | null>(null)
    const [documentRecognized, setDocumentRecognized] = useState<Record<string, any> | null>(null)
    const [documentRecognizesCount, setDocumentRecognizesCount] = useState<number>(document?.recognizes?.count || 0)

    function deleteDraft() {
        safeLocalStorage.removeItem(key)
        toast.success("Черновик удален")
    }

    useEffect(() => {
        if (document) {
            const draft = safeLocalStorage.getItem(key)
            if (draft && draft !== "undefined") {
                const parsedDraft = JSON.parse(draft)

                if (JSON.stringify(parsedDraft) != JSON.stringify(document)) {
                    openModalLoadDraft()
                }

                setDraftDocument(parsedDraft)
            } else {
                setDraftDocument(document)
            }
        }
    }, [document, key]);

    const {
        close: closeModalLoadDraft,
        open: openModalLoadDraft,
        isOpen: isOpenModalLoadDraft
    } = useModal()
    const {confirm: confirmLoadDraft, decline: declineLoadDraft} = UseConfirmOperation({
        close: closeModalLoadDraft,
        callback: () => setDocument(draftDocument)
    })

    function handleChangeDocument(e) {
        const {name, value} = e.target

        // ✅ Берем текущий черновик или оригинальный документ
        const currentDraft = draftDocument || document

        // ✅ Создаем обновленный черновик
        const updatedDraft = {
            ...currentDraft,
            [name]: value
        }

        // ✅ Сохраняем полный объект
        safeLocalStorage.setItem(key, JSON.stringify(updatedDraft))

        // ✅ Обновляем состояние
        setDraftDocument(updatedDraft)
    }

    const {
        addTag,
        tags,
        deleteTag
    } = useTags({tagsInitial: document?.categories || documentRecognized?.categories || null})
    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function getDocument({document_id}) {
        const response = await $fetch(`documents/${document_id}`)
        const document_ = response?.json?.document

        if (!document_) {
            if (user) {
                router.replace(userLink(user?.publication?.public_url))
            } else {
                router.replace(homeLink)
            }
        }
        setDocument(document_)
    }

    useEffect(() => {
        getDocument({document_id})
    }, []);

    const [checked, setChecked] = useState(document_values ? Boolean(document_values?.is_public) : true)
    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(e) {
        const response = await updateDocument({e, setErrors, formRef, tags, checked, document_id})
        safeLocalStorage.removeItem(key)
        if (response?.response?.ok) {
            router.replace(userLink(user?.publication?.public_url))
        }
    }

    async function handleDeleteDocument() {
        const response = await deleteDocument({document_id: document_id})
        safeLocalStorage.removeItem(key)
        if (response?.response?.ok) {
            router.replace(userLink(user?.publication?.public_url))
        }
    }

    const {
        close: closeModalConfirmOperation,
        open: openModalConfirmOperation,
        isOpen: isOpenModalConfirmOperation
    } = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close: closeModalConfirmOperation,
        callback: handleDeleteDocument
    })

    const [recognitions, setRecognitions] = useState<number>(user?.access?.recognizes_left || 0)

    const {
        close: closeModalRecognizeDocument,
        open: openModalRecognizeDocument,
        isOpen: isOpenModalRecognizeDocument
    } = useModal()
    const {confirm: confirmRecognize, decline: declineRecognize} = UseConfirmOperation({
        close: closeModalRecognizeDocument,
        callback: () => recognizeDocument()
    })

    async function recognizeDocument() {
        if (isLoading) {
            toast.success("Документ распознается, подождите...")
            return
        }
        setIsLoading(true)
        const response = await $fetch(`documents/${document?.id}/recognize`)
        const document_ = response?.json?.document
        if (document_) {
            setDocumentRecognized(document_)
        }
        safeLocalStorage.setItem(key, JSON.stringify(document_))
        setIsLoading(false)
        setRecognitions(prev => prev > 0 ? prev - 1 : prev)
    }

    useEffect(() => {
        setRecognitions(user?.access?.recognizes_left || 0)
    }, [user]);

    useEffect(() => {
        if (documentRecognized) {
            setDocumentRecognizesCount(prev => prev + 1)
        }
    }, [documentRecognized]);

    return (
        <form className="relative flex flex-col w-full" onSubmit={handleSubmit} ref={formRef}>

            {isLoading && <LoadingOverlay/>}

            <h5 className="text-text-main font-bold mb-6">Изменить информацию о документе</h5>

            <DraggableWrapper>
                <RecognizeButton
                    limit={recognitions}
                    callback={ document && document.constructor === Object && Array.isArray(document?.recognizes) && document?.recognizes.length > 0 || documentRecognizesCount > 0 ? openModalRecognizeDocument : recognizeDocument}
                />
            </DraggableWrapper>

            <Modal
                isOpen={isOpenModalRecognizeDocument}
                close={closeModalRecognizeDocument}
                modalClassName="lg:max-w-[500px] max-h-[350px]"
            >
                <ConfirmationForm
                    confirm={confirmRecognize}
                    decline={declineRecognize}
                    title="Вы уже распознали данный документ"
                    description="Хотите распознать заново?"
                    submitText="Распознать"
                />
            </Modal>


            <div className="flex flex-col gap-3 pb-8 w-full">

                <img src={document?.file_url} alt="" className="max-w-full object-cover"/>

                <Input name="type" label="Тип документа" placeholder="Сертификат" error={errors?.type}
                       defaultValue={documentRecognized?.type || document?.type} onChange={handleChangeDocument}/>
                <Input name="name" label="Имя документа" placeholder="веб профессионалы 2026" error={errors?.name}
                       defaultValue={documentRecognized?.name || document?.name} onChange={handleChangeDocument}/>
                <Textarea name="description" label="Описание документа" placeholder="3 место в региональном этапе"
                          error={errors?.description}
                          defaultValue={documentRecognized?.description || document?.description} onChange={handleChangeDocument}/>
                <Input name="event" label="Мероприятие" placeholder="Соревнование" error={errors?.event}
                       defaultValue={documentRecognized?.event || document?.event} onChange={handleChangeDocument}/>
                <Input name="organization" label="Организация" placeholder="Профессионалы"
                       error={errors?.organization}
                       defaultValue={documentRecognized?.organization || document?.organization} onChange={handleChangeDocument}/>
                <Date name="date" label="Дата выдачи" error={errors?.date}
                      defaultValue={documentRecognized?.date || document?.date} onChange={handleChangeDocument}/>

                <Input
                    ref={inputRef}
                    label="Добавить категорию"
                    placeholder="Например, обучение"
                    onChange={handleChangeDocument}
                    Button={
                        <Circle
                            onClick={() => {
                                // @ts-ignore
                                const fakeEvent = {
                                    target: inputRef.current,
                                    preventDefault: () => {
                                    }
                                };
                                // @ts-ignore
                                addTag(fakeEvent);
                            }}
                            className="!h-[30px] !w-[30px]"
                            icon={<AddIcon className="text-text-muted font-bold" sx={{fontSize: "18px"}}/>}
                        />
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTag(e)
                        }
                    }}
                />

                <ShowTags tags={tags} deleteTag={deleteTag} />

                <div className="flex items-center cursor-pointer" onClick={() => setChecked(!checked)}>
                    <Checkbox checked={checked} className="!text-text-main"/>
                    <p className="text-text-muted font-semibold">Документ виден в вашем профиле другим людям</p>
                </div>

                <ButtonLarge>
                    Сохранить документ
                </ButtonLarge>

                <Button
                    className="!text-text-muted !text-[12px] !font-bold !rounded-xl !w-full"
                    onClick={openModalConfirmOperation}
                >
                    Удалить документ
                </Button>

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

                <Modal
                    isOpen={isOpenModalLoadDraft}
                    close={closeModalLoadDraft}
                    modalClassName="lg:max-w-[500px] max-h-[350px]"
                >
                    <ConfirmationForm
                        confirm={confirmLoadDraft}
                        decline={() => {
                            declineLoadDraft()
                            deleteDraft()
                        }}
                        title="Обнаружен черновик, загрузить?"
                        description="вы изменяли документ, но не сохранили изменения"
                        submitText="Загрузить"
                        declineText="Удалить черновик"
                    />
                </Modal>

            </div>

        </form>
    )
}