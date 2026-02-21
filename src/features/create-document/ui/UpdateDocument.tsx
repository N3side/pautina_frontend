import {Button, Checkbox} from "@mui/material";
import Input from "@/shared/ui/Inputs/Input"
import Textarea from "@/shared/ui/Inputs/Textarea";
import {useEffect, useRef, useState} from "react";
import Date from "@/shared/ui/Inputs/Date";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import useTags from "@/entities/tags/ui/useTags";
import Circle from "@/shared/ui/Buttons/Circle"
import AddIcon from '@mui/icons-material/Add';
import LoadingOverlay from "@/shared/ui/Overlays/LoadingOverlay";
import {textSizes} from "@/shared/styles/typography/text";
import {deleteDocument} from "@/entities/document/api/delete"
import {getDocument} from "@/entities/document/api/get"
import {updateDocument} from "@/entities/document/api/update";
import {recognizeDocument} from "@/entities/document/api/recognize";

export default function UpdateDocument({setDocuments, document_id, close}) {

    const [document, setDocument] = useState<Record<string, any> | null>(null)
    const [documentRecognized, setDocumentRecognized] = useState<Record<string, any> | null>(null)
    const {addTag, Tags, tags} = useTags(documentRecognized?.categories || [])
    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        getDocument({document_id: document_id, callBack: setDocument})
    }, []);

    const [checked, setChecked] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form className="flex flex-col gap-4" onSubmit={async (e) => {

            const saved = await updateDocument(e,setErrors, formRef,tags,checked, document_id)
            setDocuments(saved)

        }} ref={formRef}>

            {isLoading && <LoadingOverlay />}

            <h5 className="text-text-main font-bold">Добавить информацию о документе</h5>

            <button
            type="button"
            className="
                glass-effect
                px-6 py-3
                rounded-xl
                text-button-lg
                text-text-main
                hover:text-brand
                transition-all duration-300
                group
                relative
                overflow-hidden
            "
            onClick={() => recognizeDocument({document_id,setIsLoading,setDocumentRecognized})}
            >
                <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    Заполнить поля через ИИ
                    <span className="text-tiny px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                        experimental
                    </span>
                </span>
            </button>

            {/*<p className="text-text-main font-bold">Вы можете использовать документы еще раз:</p>*/}

            <div className="flex flex-col gap-3 pb-8">

                <img src={document?.file_url} alt="" className="max-w-full max-h-[300px] object-cover"/>

                <Input name="type" label="Тип документа" placeholder="Сертификат" error={errors?.type} defaultValue={documentRecognized?.type} />
                <Input name="name" label="Имя документа" placeholder="веб профессионалы 2026" error={errors?.name} defaultValue={documentRecognized?.name} />
                <Textarea name="description" label="Описание документа" placeholder="3 место в региональном этапе"
                          error={errors?.description} defaultValue={documentRecognized?.description}/>
                <Input name="event" label="Мероприятие" placeholder="Соревнование" error={errors?.event} defaultValue={documentRecognized?.event}/>
                <Input name="organization" label="Организация" placeholder="Профессионалы"
                       error={errors?.organization} defaultValue={documentRecognized?.organization}/>
                <Date name="date" label="Дата выдачи" error={errors?.date} defaultValue={documentRecognized?.date}/>

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

                <div className="flex gap-3">
                    {Tags}
                </div>

                <div className="flex items-center cursor-pointer" onClick={() => setChecked(!checked)}>
                    <Checkbox checked={checked}/>
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
                    onClick={async () => {
                        const saved = await deleteDocument({document_id: document_id})
                        setDocuments(saved)
                        close()
                    }}
                >
                    Удалить документ
                </Button>

            </div>

        </form>
    )
}