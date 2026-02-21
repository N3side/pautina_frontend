"use client"

import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Tag from "@/shared/ui/Buttons/Tag";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Status from "@/shared/ui/Tiny/Status";
import {download} from "@/shared/lib/utils/download";
import dynamic from 'next/dynamic';
const PDFFirstPage = dynamic(() => import('@/shared/lib/utils/PDFViewer').then(mod => mod.PDFFirstPage), {
    ssr: false,
    loading: () => <div></div>
});
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Props {
    document: Record<string, any>
    props: any
}

export default function Card({document, ...props}) {

    const file_extension = document?.file_url.split(".").pop()

    return (
        <div
            className="
                group relative flex flex-col h-full
                glass-effect
                rounded-2xl overflow-hidden
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-1
                cursor-pointer border border-border-default/50
            "
            {...props}
        >
            {/* Контейнер изображения */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">

                {file_extension === "pdf" ?
                <PDFFirstPage file={document?.file_url} />
                    :
                <img
                    src={document?.file_url}
                    alt={document?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />}

                <Status variant={document?.is_public ? "public" : "private"} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Контент */}
            <div className="flex flex-col flex-grow p-5 gap-3">

                {/* Мета-данные (Дата и Тип) */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 opacity-70">
                        <CalendarTodayIcon className="w-4 h-4 text-brand" />
                        <span className="text-[12px] font-medium text-text-muted">{document?.date}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand/10 text-brand font-bold uppercase tracking-tighter">
                        {document?.type}
                    </span>
                </div>

                {/* Заголовок и Организация */}
                <div className="space-y-1">
                    <h3 className="text-lg text-text-main font-bold leading-tight line-clamp-2 group-hover:text-brand transition-colors duration-300">
                        {document?.name}
                    </h3>
                    {document?.organization && (
                        <div className="flex items-center gap-1 text-text-muted/80">
                            <BusinessCenterIcon sx={{ fontSize: 14 }} />
                            <p className="text-tiny font-medium truncate">{document?.organization}</p>
                        </div>
                    )}
                </div>

                {/* Описание */}
                {document?.description && (
                    <p className="text-small text-text-muted line-clamp-2 leading-relaxed">
                        {document?.description}
                    </p>
                )}

                {/* Категории (Теги) - Горизонтальный скролл если их много */}
                {document?.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {document?.categories.map((cat: Record<string, any>) => (
                            <Tag
                                key={cat.id || cat.tag}
                                tag={cat.tag}
                                color={cat.color || '#6366f1'}
                                // Убираем onRemove, так как это карточка просмотра
                            />
                        ))}
                    </div>
                )}

                {/* Футер */}


                <div className="pt-4 mt-auto border-t border-border-default/30 flex items-center justify-between">

                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase font-semibold opacity-50">Событие</span>
                        <p className="text-small font-bold text-text-main truncate max-w-[150px]">
                            {document?.event || "Событие не указано"}
                        </p>
                    </div>

                    <Button
                        disableElevation
                        className="!min-w-0 !w-10 !h-10 !rounded-xl !p-0 !bg-brand !text-white hover:!bg-brand-dark shadow-lg shadow-brand/20 transition-all duration-300 active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation()
                            download(document?.file_url)
                        }}
                    >
                        <DownloadIcon fontSize="small" />
                    </Button>
                </div>
            </div>

            {/* Декоративная иконка перехода */}
            <div className="absolute top-4 right-4 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-xl text-brand">
                    <ArrowOutwardIcon style={{ fontSize: 18 }} />
                </div>
            </div>
        </div>
    )
}