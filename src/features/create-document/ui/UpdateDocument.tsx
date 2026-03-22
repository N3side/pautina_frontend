"use client"

import {Button, Checkbox} from "@mui/material";
import Input from "@/shared/ui/Inputs/Input"
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Date from "@/shared/ui/Inputs/Date";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import useTags from "@/entities/tags/lib/useTags";
import Circle from "@/shared/ui/Buttons/Circle"
import AddIcon from '@mui/icons-material/Add';
import LoadingOverlay from "@/shared/ui/Overlays/LoadingOverlay";
import {textSizes} from "@/shared/styles/typography/text";
import {deleteDocument} from "@/entities/document/api/delete"
import {updateDocument} from "@/entities/document/api/update";
import {recognizeDocument} from "@/entities/document/api/recognize";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import {useModal} from "@/shared/lib/hooks/useModal";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {Modal} from "@/shared/ui/Modals/Modal";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import {useRouter} from "next/navigation";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import ShowTags from "@/entities/tags/ui/showTags";
import {DraggableWrapper} from "@/shared/ui/DraggableWrapper/DragableWrapper";

interface Props {
    document_values?: Record<string, any> | null
    document_id: string
}

export default function UpdateDocument({document_values, document_id}: Props) {

    const router = useRouter()

    const {user} = useContext(UserContext)

    const [document, setDocument] = useState<Record<string, any> | null>(null)
    const [documentRecognized, setDocumentRecognized] = useState<Record<string, any> | null>(null)

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
        if (response?.response?.ok) {
            router.replace(userLink(user?.publiccation?.public_url))
        }
    }

    const handleDeleteDocument = useCallback(async () => {
        const response = await deleteDocument({document_id: document_id})
        if (response?.response?.ok) {
            router.replace(userLink(user?.publiccation?.public_url))
        }
    }, [])

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

    useEffect(() => {
        setRecognitions(user?.access?.recognizes_left || 0)
    }, [user]);

    return (
        <form className="relative flex flex-col w-full" onSubmit={handleSubmit} ref={formRef}>

            {isLoading && <LoadingOverlay/>}

            <h5 className="text-text-main font-bold mb-6">Изменить информацию о документе</h5>

            <DraggableWrapper>

                <div
                    className="
                        relative z-[100]
                        w-[calc(100vw-2rem)] max-w-[500px]
                        flex items-center justify-between
                        p-4
                        rounded-2xl
                        backdrop-blur-2xl
                        border-2 border-brand/40
                        shadow-[0_20px_50px_rgba(var(--brand-rgb),0.3)]
                        hover:border-brand hover:scale-[1.02]
                        active:scale-[0.98]
                        transition-all duration-300
                        group
                        overflow-hidden
                    "
                    onClick={(e) => {
                        e.preventDefault()
                        recognizeDocument({document_id, setIsLoading, setDocumentRecognized, setRecognitions})
                    }}
                >
                    {/* Эффект сканирующего блика (пролетает при наведении) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>

                    <div className="relative z-10 flex items-center gap-4">
                        {/* Иконка с пульсацией */}
                        <div
                            className="p-2.5 rounded-xl bg-brand/20 text-brand shadow-[inset_0_0_10px_rgba(var(--brand-rgb),0.2)]">
                            <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M11.5,2L9,6.5L4.5,9L9,11.5L11.5,16L14,11.5L18.5,9L14,6.5L11.5,2M11.5,18L10.25,20.25L8,21.5L10.25,22.75L11.5,25L12.75,22.75L15,21.5L12.75,20.25L11.5,18M19,14L17.75,16.25L15.5,17.5L17.75,18.75L19,21L20.25,18.75L22.5,17.5L20.25,16.25L19,14Z"/>
                            </svg>
                        </div>

                        <div className="flex flex-col items-start leading-tight">
                            <p className="font-bold text-white text-base group-hover:text-brand transition-colors">
                                Авто-заполнение
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-end gap-1.5">
                    <span
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-brand text-white font-black uppercase tracking-wider shadow-lg shadow-brand/40">
                        BETA
                    </span>
                    <span className="text-[11px] text-zinc-400">
                        Лимит: <b className="text-white font-mono">{recognitions}</b>
                    </span>
                    </div>

                </div>
            </DraggableWrapper>


            <div className="flex flex-col gap-3 pb-8 w-full">

                <img src={document?.file_url} alt="" className="max-w-full object-cover"/>

                <Input name="type" label="Тип документа" placeholder="Сертификат" error={errors?.type}
                       defaultValue={document?.type || documentRecognized?.type}/>
                <Input name="name" label="Имя документа" placeholder="веб профессионалы 2026" error={errors?.name}
                       defaultValue={document?.name || documentRecognized?.name}/>
                <Textarea name="description" label="Описание документа" placeholder="3 место в региональном этапе"
                          error={errors?.description}
                          defaultValue={document?.descriptioni || documentRecognized?.description}/>
                <Input name="event" label="Мероприятие" placeholder="Соревнование" error={errors?.event}
                       defaultValue={document?.event || documentRecognized?.event}/>
                <Input name="organization" label="Организация" placeholder="Профессионалы"
                       error={errors?.organization}
                       defaultValue={document?.organization || documentRecognized?.organization}/>
                <Date name="date" label="Дата выдачи" error={errors?.date}
                      defaultValue={document?.date || documentRecognized?.date}/>

                <Input
                    ref={inputRef}
                    label="Добавить категорию"
                    placeholder="Например, обучение"
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
                    style={{
                        fontSize: textSizes.tiny,
                    }}
                    className="!text-text-muted !rounded-xl !w-full"
                    onClick={openModalConfirmOperation}
                >
                    Удалить документ
                </Button>

                <Modal
                    isOpen={isOpenModalConfirmOperation}
                    close={closeModalConfirmOperation}
                    modalClassName="max-w-[500px] max-h-[350px]"
                >
                    <ConfirmationForm confirm={confirm} decline={decline}/>
                </Modal>

            </div>

        </form>
    )
}