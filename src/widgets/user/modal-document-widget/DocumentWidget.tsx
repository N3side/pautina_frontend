"use client"

import {WheelXScrollProvider} from "@/shared/ui/WheelScrollXWrapper/WheelScrollXWrapper";
import {Button} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import Status from "@/shared/ui/Status/Status";
import {download} from "@/shared/lib/utils/download";
import DeleteIcon from '@mui/icons-material/Delete';
import dynamic from 'next/dynamic';
import {deleteDocument} from "@/entities/admin/document/api/delete";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import {useCallback} from "react";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import Link from "next/link"
import useTags from "@/entities/tags/lib/useTags";
import ShowTags from "@/entities/tags/ui/showTags";
import SmartMedia from "@/shared/ui/smart-media/SmartMedia";

const PDFFirstPage = dynamic(() => import('@/shared/lib/utils/PDFViewer').then(mod => mod.PDFFirstPage), {
    ssr: false,
    loading: () => <div></div>
});

interface Props {
    document: Record<string, any> | null
    close: any
    setDocuments: any
    isMyProfile: boolean
}

export function DocumentWidget({document, close, setDocuments, isMyProfile}: Props) {

    const file_extension = document?.file_url.split(".").pop()

    const handleDeleteDocument = useCallback(async () => {
        if (!document?.id) return;
        await deleteDocument({document_id: document?.id, callBack: close});
        close();
    }, [document, close, setDocuments]);

    const {close: closeModalConfirmOperation, open: openModalConfirmOperation, isOpen: isOpenModalConfirmOperation} = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close:closeModalConfirmOperation,
        callback: handleDeleteDocument
    })

    const {tags} = useTags({tagsInitial: document?.categories})

    return (
        <div className="w-full flex flex-col">

            {isMyProfile && (
                <Status variant={document?.is_public ? "Видно всем" : "Черновик"} className="absolute top-[40px] left-[40px]"/>
            )}

            {file_extension === "pdf" ?
                <PDFFirstPage file={document?.file_url} />
                :
                <SmartMedia src={document?.file_url} className="h-full w-full" wrapperClassName="min-h-[230px]" />
            }

            {/* Правая часть: Информация */}
            <div className="info w-full flex flex-col h-full">

                {/* Основной контент со скроллом */}
                <div className="flex-grow overflow-y-auto pt-8 pb-4
                    [&::-webkit-scrollbar-track]:bg-transparent">

                    {/* Заголовок */}
                    <header className="flex flex-col gap-3">
                        <h4 className="text-text-main font-black leading-tight">
                            {document?.name}
                        </h4>
                    </header>

                    <ShowTags tags={tags} />

                    <div className="mt-4 flex flex-col gap-3">
                        <p className="text-small text-text-muted font-bold uppercase tracking-wider">
                            Описание
                        </p>
                        <p className="text-secondary text-text-main leading-relaxed opacity-90">
                            {document?.description}
                        </p>
                    </div>

                    {/* Сетка характеристик (Glass Style) */}
                    <div className="mt-4 grid grid-cols-2 gap-6 p-5 glass-effect rounded-2xl">
                        <div className="flex flex-col gap-1">
                            <p className="text-tiny text-text-muted font-bold uppercase tracking-wider">
                                Дата выдачи
                            </p>
                            {document?.date && (
                                <div className="flex items-center gap-2 text-text-main">
                                    <CalendarTodayIcon sx={{fontSize: "18px"}} />
                                    <p className="text-small font-medium">{document?.date}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-tiny text-text-muted font-bold uppercase tracking-wider">
                                Событие
                            </p>
                            <p className="text-small text-text-main font-medium">{document?.event}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-tiny text-text-muted font-bold uppercase tracking-wider">
                                Кто выдал
                            </p>
                            <p className="text-small text-text-main font-medium">{document?.organization}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-tiny text-text-muted font-bold uppercase tracking-wider">
                                Тип документа
                            </p>
                            <div className="text-small text-text-main font-medium">
                                {document?.type}
                            </div>
                        </div>
                    </div>

                </div>

                <WheelXScrollProvider className="min-h-[50px] py-[2px] h-full">

                    <div className="flex gap-[10px] min-w-max">

                        {isMyProfile && (
                            <Link href={`/edit/document/${document?.id}`}>
                                <ActionButton text="Редактировать" Icon={EditIcon} />
                            </Link>
                        )}

                        {isMyProfile && (
                            <>
                                <ActionButton text="Удалить" Icon={DeleteIcon} onClick={openModalConfirmOperation} />

                                <Modal
                                    isOpen={isOpenModalConfirmOperation}
                                    close={closeModalConfirmOperation}
                                    modalClassName="max-w-[500px] max-h-[350px]"
                                >
                                    <ConfirmationForm confirm={confirm} decline={decline} />
                                </Modal>

                            </>
                        )}

                        <Button
                            onClick={() => download(document?.file_url)}
                            className="!rounded-xl !px-8 !h-full !normal-case !bg-brand hover:!bg-brand-hover !text-white transition-all"
                            variant="contained"
                            startIcon={<DownloadIcon className="w-5 h-5 text-text-white"/>}
                        >
                            <p className="text-small font-bold">Скачать</p>
                        </Button>

                    </div>
                </WheelXScrollProvider>

            </div>
        </div>
    );
}