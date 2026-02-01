"use client"

import Calendar from "@/shared/vector/Calendar";
import { PautinaText } from "@/shared/styles/typography/text";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'; // Добавил иконку стрелки для эстетики
import { CardProps } from "../model/index"

export default function Card(card: CardProps) {
    return (
        <div
            className="
                group relative flex flex-col h-full
                bg-surface border border-border-default rounded-2xl overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:border-brand/30
                cursor-pointer
            "
            onClick={card?.onClick}
        >
            {/* Изображение с эффектом зума */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                    src={card?.image}
                    alt={card?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Бейдж категории (с эффектом стекла) */}
                <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 backdrop-blur-md rounded-lg shadow-sm border border-black/5 dark:border-white/10">
                        <PautinaText variant="tiny" className="text-white font-bold uppercase tracking-wider text-[10px]">
                            {card?.category}
                        </PautinaText>
                    </span>
                </div>

                {/* Оверлей при наведении (затемнение) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Контент */}
            <div className="flex flex-col flex-grow p-5 gap-3">

                {/* Дата */}
                <div className="flex items-center gap-2 opacity-80">
                    <div className="text-brand">
                        <Calendar />
                    </div>
                    <PautinaText variant="tiny" className="text-text-muted font-medium">
                        {card?.date}
                    </PautinaText>
                </div>

                {/* Заголовок (обрезается, если слишком длинный) */}
                <div className="flex-grow">
                    <PautinaText
                        className="text-text-main font-bold leading-tight line-clamp-2 group-hover:text-brand transition-colors duration-300"
                        variant="default"
                    >
                        {card?.title}
                    </PautinaText>
                </div>

                {/* Футер карточки */}
                <div className="pt-3 mt-auto border-t border-border-default/50 flex items-center justify-between">
                    <PautinaText variant="small" className="text-text-muted font-medium">
                        {card?.type}
                    </PautinaText>

                    {/* Кнопка действия */}
                    <div className="flex gap-2">
                        <Button
                            disableElevation
                            className="!min-w-0 !w-10 !h-10 !rounded-full !p-0 !bg-brand/10 hover:!bg-brand hover:!text-white !text-brand transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation(); // Чтобы клик по кнопке не триггерил клик по карточке
                                // Логика скачивания
                            }}
                        >
                            <DownloadIcon fontSize="small" />
                        </Button>
                    </div>
                </div>

            </div>

            {/* Декоративная иконка стрелки, появляется при наведении на картинке (опционально) */}
            <div className="absolute top-3 right-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg text-text-main">
                    <ArrowOutwardIcon className="text-text-muted" style={{ fontSize: 16 }} />
                </div>
            </div>
        </div>
    )
}