"use client"

import Calendar from "@/shared/assets/images/vector/Calendar";
import {WheelXScrollProvider} from "@/shared/ui/Wrappers/WheelScrollXWrapper";
import {Button} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import useTags from "@/entities/tags/ui/useTags";
import Status from "@/shared/ui/Tiny/Status";
import {download} from "@/shared/lib/utils/download";
import DeleteIcon from '@mui/icons-material/Delete';
import {PDFFirstPage} from "@/shared/lib/utils/PDFViewer";
import {deleteDocument} from "@/entities/document/api/delete";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export function DocumentWidget({document, close, setDocuments}: { document: Record<string, any> | null, close: any, setDocuments: any }) {

    const {Tags} = useTags({tagsInitial: document?.tags})

    const file_extension = document?.file_url.split(".").pop()

    return (
        <div className="w-full flex flex-col">

            <Status variant={document?.is_public ? "public" : "private"} className="absolute top-[40px] left-[40px]"/>

            {file_extension === "pdf" ?
                PDFFirstPage({file: document?.file_url})
                :
                <img
                    src={document?.file_url}
                    className="w-full h-full object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-110"
                />}

            {/* Правая часть: Информация */}
            <div className="info w-full flex flex-col h-full">

                {/* Основной контент со скроллом */}
                <div className="flex-grow overflow-y-auto pt-8 pb-4
                    [&::-webkit-scrollbar-track]:bg-transparent">

                    {Tags}

                    {/* Заголовок */}
                    <header className="flex flex-col gap-3">
                        <h4 className="text-text-main font-black leading-tight">
                            {document?.name}
                        </h4>
                    </header>

                    {/* Описание */}
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
                            <div className="flex items-center gap-2 text-text-main">
                                <CalendarTodayIcon />
                                <p className="text-small font-medium">{document?.date}</p>
                            </div>
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

                <WheelXScrollProvider className="min-h-[45px]">

                    <div className="flex gap-[10px] min-w-max">
                        <Button
                            className="!rounded-xl !px-6 !py-2.5 !normal-case !text-text-main !border-border-default hover:!bg-input transition-all"
                            variant="outlined"
                            startIcon={<EditIcon/>}
                        >
                            <p className="text-secondary font-semibold">Редактировать</p>
                        </Button>

                        <div className="flex items-center gap-3 ml-auto">
                            <Button
                                className="!min-w-0 !w-11 !h-11 !rounded-xl !border-border-default !text-text-muted hover:!text-brand hover:!bg-brand/5 transition-all"
                                variant="outlined"
                            >
                                <ShareIcon/>
                            </Button>

                            <Button
                                onClick={() => download(document?.file_url)}
                                className="!rounded-xl !px-8 !py-2.5 !normal-case !bg-brand hover:!bg-brand-hover !text-white !shadow-lg !shadow-brand/20 transition-all"
                                variant="contained"
                                startIcon={<DownloadIcon className="w-5 h-5 text-text-white"/>}
                            >
                                <p className="text-secondary font-bold">Скачать</p>
                            </Button>

                            <Button
                                className="!rounded-xl !px-8 !py-3 !normal-case !bg-gradient-to-r !from-rose-500 !to-red-600
                               !shadow-lg !shadow-rose-500/30 hover:!shadow-xl hover:!shadow-rose-500/40
                               !transition-all !duration-300 hover:!scale-105 active:!scale-95"
                                variant="contained"
                                startIcon={<DeleteIcon className="w-5 h-5 text-white"/>}
                                onClick={async () => {
                                    const saved = await deleteDocument({document_id: document?.id, callBack: close})
                                    setDocuments(saved)
                                    close()
                                }}
                            >
                                <span className="text-white font-semibold tracking-wide">Удалить</span>
                            </Button>

                        </div>
                    </div>
                </WheelXScrollProvider>

            </div>
        </div>
    );
}