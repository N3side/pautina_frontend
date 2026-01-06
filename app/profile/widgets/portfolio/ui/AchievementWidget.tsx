import {useModal} from "@/shared/components/Modal"
import {ReactNode, useContext} from "react";
import {PautinaText} from "@/shared/styles/typography/text";
import {Heading} from "@/shared/styles/typography/headings";
import Temple from "@/shared/vector/Temple";
import Calendar from "@/shared/vector/Calendar";
import Python from "@/shared/vector/skills/python";
import Frontend from "@/shared/vector/skills/frontend";
import {WheelXScrollProvider} from "@/shared/components/WheelScrollXWrapper";
import Edit from "@/shared/vector/Edit";
import {Button} from "@mui/material";
import Share from "@/shared/vector/Share";
import Download from "@/shared/vector/Download";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {colorStyles} from "@/shared/styles/colors";
import {WindowContext} from "@/shared/providers/WindowProvider";


export function AchievementWidget() {

    const {_window} = useContext(WindowContext)

    return (
        <div className="bg-[#E5E7EB] w-full h-full flex rounded-[20px]">
            <div className="h-full max-w-[426px] w-full">

            </div>
            <div className={`info w-full bg-[white] px-[clamp(20px,1.250vw_+_16.000px,40px)]
            py-[clamp(20px,1.250vw_+_16.000px,40px)] rounded-[20px] flex flex-col justify-between
            ${_window?.innerWidth < 1024 ? "pr-[5px]" : ""}
            `}
             style={{
                borderBottomLeftRadius: "0",
                borderTopLeftRadius: "0"
            }}>
                <div className="
                    overflow-y-scroll
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar]:h-[20%]
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-[transparent]
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                    <div className="flex items-center gap-[15px]">
                        <div className="px-[8px] py-[3.5px] rounded-[50%]">
                            <PautinaText variant="tiny" style={{
                                textTransform: "uppercase",
                                fontWeight: 700
                            }}>
                                Обучение
                            </PautinaText>
                        </div>
                        <div className="tag">
                            <PautinaText variant="tiny" style={{
                                textTransform: "uppercase",
                                fontWeight: 700
                            }}>
                                Подтверждено
                            </PautinaText>
                        </div>
                    </div>
                    <header className="mt-[clamp(10px,0.625vw_+_8.000px,20px)]">
                        <Heading variant="h4" style={{
                            fontWeight: 700
                        }}>
                            ППК. Введение в алгоритмы:
                            реализация на языке Python
                        </Heading>
                        <div className="mt-[10px] flex items-center gap-[10px]">
                            <Temple />
                            <PautinaText variant="default" style={{
                                fontWeight: 500
                            }}>
                                Яндекс Практикум & МЦК-КТИТС
                            </PautinaText>
                        </div>
                    </header>

                    <div className="mt-[clamp(10px,0.625vw_+_8.000px,20px)] grid grid-cols-[repeat(auto-fit,minmax(100px,200px))]
                    gap-y-[5px] gap-x-[clamp(30px, 1.250vw + 26.000px, 50px)] bg-[#F9FAFB] px-[clamp(10px,0.625vw_+_8.000px,20px)] py-[clamp(10px,0.625vw_+_8.000px,20px)]">
                        <div className="group">
                            <PautinaText variant="tiny" color="#9CA3AF" style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                Дата выдачи
                            </PautinaText>
                            <div className="flex items-center gap-[10px] mt-[5px]" color="#9CA3AF" style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                <Calendar />
                                <PautinaText variant="secondary" color="#1F2937" style={{
                                    fontWeight: 500,
                                    textTransform: "none"
                                }}>
                                    Ноябрь 2024
                                </PautinaText>
                            </div>
                        </div>
                        <div className="group">
                            <PautinaText variant="tiny" color="#9CA3AF" style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                ID Сертификата
                            </PautinaText>
                            <div className="mt-[5px]">
                                <PautinaText variant="secondary" color="#1F2937" style={{
                                    fontWeight: 500,
                                    textTransform: "none"
                                }}>
                                    CRT-883920-PY
                                </PautinaText>
                            </div>
                        </div>
                        <div className="group">
                            <PautinaText variant="tiny" color="#9CA3AF" style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                Формат
                            </PautinaText>
                            <div className="mt-[5px]">
                                <PautinaText variant="secondary" color="#1F2937" style={{
                                    fontWeight: 500,
                                    textTransform: "none"
                                }}>
                                    Онлайн-курс (72 ч.)
                                </PautinaText>
                            </div>
                        </div>
                        <div className="group">
                            <PautinaText variant="tiny" color="#9CA3AF" style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                Навыки
                            </PautinaText>
                            <div className="flex items-center gap-[15px] mt-[5px]">
                                <Python />
                                <Frontend />
                            </div>
                        </div>
                    </div>

                    <div className="mt-[clamp(10px,0.625vw_+_8.000px,20px)]">
                        <PautinaText variant="small" style={{
                            fontWeight: 700,
                            textTransform: "uppercase"
                        }}>
                            Описание
                        </PautinaText>
                        <PautinaText variant="small" className="mt-[10px]">
                            Успешное прохождение курса по основам алгоритмизации и структур
                            данных. В рамках обучения были изучены: сортировка, поиск, рекурсия,
                            графы и хеш-таблицы. Выполнен итоговый проект по оптимизации
                            поискового алгоритма для базы данных на 10,000 записей.
                        </PautinaText>
                    </div>

                    <div className="mt-[25px]">
                        <PautinaText variant="small" style={{
                            fontWeight: 700,
                            textTransform: "uppercase"
                        }}>
                            Компетенции
                        </PautinaText>

                        <WheelXScrollProvider className="mt-[10px]">
                            {
                                ["Python Core", "Algorithms", "Data Structures", "Git"].map((elem, i) =>
                                    <li key={i} className="px-[9px] py-[6px]" style={{
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "8px"
                                    }}>
                                        <PautinaText variant="small" className="whitespace-nowrap">
                                            {elem}
                                        </PautinaText>
                                    </li>
                                )
                            }
                        </WheelXScrollProvider>
                    </div>
                </div>

                {/*<div className="flex justify-between items-center">*/}
                <WheelXScrollProvider className="min-h-[45px] py-[3px]">

                    <div className="flex gap-[10px] min-w-max"> {/* ← ОБЕРТКА с фиксированной минимальной шириной */}
                        <Button className="flex gap-2 shrink-0" style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "12px",
                            padding: "8px 20px"
                        }}>
                            <Edit />
                            <PautinaText variant="secondary" className="whitespace-nowrap" style={{
                                textTransform: "none",
                                fontWeight: 500
                            }}>
                                Редактировать
                            </PautinaText>
                        </Button>

                        <div className="rigth flex gap-[10px] items-center shrink-0">
                            <Button className="shrink-0" style={{
                                padding: "12px",
                                border: "1px solid #D1D5DB",
                                borderRadius: "12px",
                                minWidth: "0",
                            }}>
                                <Share />
                            </Button>
                            <ShadowWrapper className="shrink-0">
                                <Button className="shrink-0" style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: "5px",
                                    background: colorStyles.buttons.brand.light,
                                    padding: "8px 30px",
                                    borderRadius: "12px"
                                }}>
                                    <Download />
                                    <PautinaText color="white" className="whitespace-nowrap" variant="secondary" style={{
                                        textTransform: "none",
                                        fontWeight: 500
                                    }}>
                                        Скачать PDF
                                    </PautinaText>
                                </Button>
                            </ShadowWrapper>
                        </div>
                    </div>
                </WheelXScrollProvider>
            </div>
        </div>
    )
}