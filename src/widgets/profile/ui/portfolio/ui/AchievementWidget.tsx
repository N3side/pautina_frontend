"use client"

import {PautinaText} from "@/shared/styles/typography/text";
import {Heading} from "@/shared/styles/typography/headings";
import Temple from "@/shared/assets/images/vector/Temple";
import Calendar from "@/shared/assets/images/vector/Calendar";
import Python from "@/shared/assets/images/vector/skills/python";
import Frontend from "@/shared/assets/images/vector/skills/frontend";
import {WheelXScrollProvider} from "@/shared/ui/wrappers/WheelScrollXWrapper";
import {Button} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {ShadowWrapper} from "@/shared/ui/wrappers/Shadow";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

export function AchievementWidget({previewImage=null}) {

    return (
        <div className="w-full flex flex-col md:flex-row">

            {/* Левая часть: Превью сертификата (имитация) */}
            {/* --- ЧАСТЬ 1: ПРЕВЬЮ (Viewer) --- */}
            {/* На мобилках: h-[280px] w-full
                На десктопе: w-[350px] (или flex-basis) h-auto (растягивается)
            */}
            <div className="relative flex-none w-full h-[280px] md:w-[400px] md:h-auto
                bg-[#F3F4F6] dark:bg-[#111]
                border-b md:border-b-0 md:border-r border-border-default
                flex items-center justify-center p-8 overflow-hidden group"
            >
                {/* Декоративный паттерн на фоне (точки) */}
                <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1]"
                     style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                {/* Сам "Лист" сертификата */}
                <div className="relative z-10 w-auto h-full max-h-[90%] aspect-[1.414/1] md:aspect-[1/1.414] lg:aspect-[1.414/1]
                    bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]
                    border-[6px] border-white dark:border-[#2a2a2a] rounded-sm
                    transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in"
                >
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Certificate Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        // Фолбэк, если картинки нет (красивая заглушка)
                        <div className="w-full bg-surface h-full flex flex-col items-center justify-center p-4 border border-border-default/20">
                            <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4">
                                <Temple />
                            </div>
                            <div className="w-3/4 h-3 bg-border-default/40 rounded-full mb-2" />
                            <div className="w-1/2 h-3 bg-border-default/30 rounded-full" />

                            {/* Печать */}
                            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full border-2 border-brand/20 opacity-50 border-dashed" />
                        </div>
                    )}

                    {/* Оверлей при наведении (Кнопка просмотра) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <Button
                            variant="contained"
                            className="!rounded-full !bg-white/20 !backdrop-blur-md !min-w-0 !p-3 hover:!bg-white/30 !shadow-none"
                        >
                            <VisibilityIcon className="text-white" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Правая часть: Информация */}
            <div className="info w-full flex flex-col h-full">

                {/* Основной контент со скроллом */}
                <div className="flex-grow overflow-y-auto px-6 py-8 md:px-10
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-border-default
                    [&::-webkit-scrollbar-thumb]:rounded-full">

                    {/* Тэги */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
                            <PautinaText variant="tiny" className="text-text-brand font-bold uppercase">
                                Обучение
                            </PautinaText>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-green-main/10 border border-green-main/20 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-main" />
                            <PautinaText variant="tiny" className="text-green-main font-bold uppercase">
                                Подтверждено
                            </PautinaText>
                        </span>
                    </div>

                    {/* Заголовок */}
                    <header>
                        <Heading variant="h4" className="text-text-main font-black leading-tight">
                            ППК. Введение в алгоритмы: реализация на языке Python
                        </Heading>
                        <div className="mt-4 flex items-center gap-2 text-text-muted">
                            <Temple />
                            <PautinaText variant="default" className="font-semibold text-text-main/80">
                                Яндекс Практикум & МЦК-КТИТС
                            </PautinaText>
                        </div>
                    </header>

                    {/* Сетка характеристик (Glass Style) */}
                    <div className="mt-8 grid grid-cols-2 gap-6 p-5 glass-effect rounded-2xl">
                        <div className="space-y-1">
                            <PautinaText variant="tiny" className="text-text-muted font-bold uppercase tracking-wider">
                                Дата выдачи
                            </PautinaText>
                            <div className="flex items-center gap-2 text-text-main">
                                <Calendar />
                                <PautinaText variant="small" className="font-medium">Ноябрь 2024</PautinaText>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <PautinaText variant="tiny" className="text-text-muted font-bold uppercase tracking-wider">
                                ID Сертификата
                            </PautinaText>
                            <PautinaText variant="small" className="text-text-main font-medium">CRT-883920-PY</PautinaText>
                        </div>
                        <div className="space-y-1">
                            <PautinaText variant="tiny" className="text-text-muted font-bold uppercase tracking-wider">
                                Формат
                            </PautinaText>
                            <PautinaText variant="small" className="text-text-main font-medium">Онлайн-курс (72 ч.)</PautinaText>
                        </div>
                        <div className="space-y-1">
                            <PautinaText variant="tiny" className="text-text-muted font-bold uppercase tracking-wider">
                                Стек
                            </PautinaText>
                            <div className="flex items-center gap-3 pt-1">
                                <Python  />
                                <Frontend  />
                            </div>
                        </div>
                    </div>

                    {/* Описание */}
                    <div className="mt-8 space-y-3">
                        <PautinaText variant="small" className="text-text-muted font-bold uppercase tracking-wider">
                            Описание
                        </PautinaText>
                        <PautinaText variant="default" className="text-text-main leading-relaxed opacity-90">
                            Успешное прохождение курса по основам алгоритмизации и структур данных.
                            В рамках обучения были изучены: сортировка, поиск, рекурсия, графы и хеш-таблицы.
                        </PautinaText>
                    </div>

                    {/* Компетенции */}
                    <div className="mt-8">
                        <PautinaText variant="small" className="text-text-muted font-bold uppercase tracking-wider mb-4">
                            Компетенции
                        </PautinaText>
                        <WheelXScrollProvider className="pb-2">
                            {["Python Core", "Algorithms", "Data Structures", "Git"].map((elem, i) => (
                                <li key={i} className="px-4 py-2 border border-border-default rounded-xl transition-colors hover:border-brand/50">
                                    <PautinaText variant="small" className="whitespace-nowrap font-medium text-text-main">
                                        {elem}
                                    </PautinaText>
                                </li>
                            ))}
                        </WheelXScrollProvider>
                    </div>
                </div>

                <WheelXScrollProvider className="min-h-[45px] py-[3px]">

                    <div className="flex gap-[10px] min-w-max px-8"> {/* ← ОБЕРТКА с фиксированной минимальной шириной */}
                        <Button
                            className="!rounded-xl !px-6 !py-2.5 !normal-case !text-text-main !border-border-default hover:!bg-input transition-all"
                            variant="outlined"
                            startIcon={<EditIcon  />}
                        >
                            <PautinaText variant="secondary" className="font-semibold">Редактировать</PautinaText>
                        </Button>

                        <div className="flex items-center gap-3 ml-auto">
                            <Button
                                className="!min-w-0 !w-11 !h-11 !rounded-xl !border-border-default !text-text-muted hover:!text-brand hover:!bg-brand/5 transition-all"
                                variant="outlined"
                            >
                                <ShareIcon  />
                            </Button>

                            <ShadowWrapper>
                                <Button
                                    className="!rounded-xl !px-8 !py-2.5 !normal-case !bg-brand hover:!bg-brand-hover !text-white !shadow-lg !shadow-brand/20 transition-all"
                                    variant="contained"
                                    startIcon={<DownloadIcon className="w-5 h-5 text-text-white" />}
                                >
                                    <PautinaText variant="secondary" className="font-bold">Скачать PDF</PautinaText>
                                </Button>
                            </ShadowWrapper>
                        </div>
                    </div>
                </WheelXScrollProvider>

            </div>
        </div>
    );
}