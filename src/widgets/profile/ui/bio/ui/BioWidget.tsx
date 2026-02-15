"use client"

import React from 'react';
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import HttpsIcon from '@mui/icons-material/Https';

import { Elem } from "@/widgets/profile/ui/bio/ui/Elem";
import { Elems, getActivityElems, getContactElems } from "@/widgets/profile/ui/bio/model";
import useEditProfile from "@/features/edit-profile/ui/EditProfile";

// Вспомогательный компонент для заголовка секции
const SectionTitle = ({ colorClass, title }: { colorClass: string, title: string }) => (
    <header className="flex items-center gap-3 mb-4">
        <div className={`w-1.5 h-1.5 rounded-full ${colorClass}`}></div>
        <p className="text-label text-text-muted">
            {title}
        </p>
    </header>
);

export default function BioWidget({ isMyProfile, trueUser }: { isMyProfile: boolean, trueUser: Record<string, any> }) {

    // Определяем, является ли профиль приватным (основываясь на флаге is_uploaded из PHP или отсутствии детальных данных)
    // Если is_uploaded === false, считаем профиль приватным/неполным для публичного просмотра
    const isPrivate = trueUser?.is_uploaded === false && !isMyProfile;

    const activityList = getActivityElems(trueUser);
    const contactList = getContactElems(trueUser);

    const { modalEdit, openEdit } = useEditProfile({ enabled: isMyProfile });

    return (
        <section className="w-full h-full flex flex-col glass-effect border-border-glass rounded-[24px] transition-all duration-300">

            {/* Декоративный градиент сверху (еле заметный) */}
            {/*<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/40 via-purple-500/40 to-brand/0 opacity-50"></div>*/}

            <div className="p-6 md:p-8 flex flex-col h-full">

                {/* --- HEADER --- */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {/* Icon Box с легким свечением */}
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand shadow-sm border border-brand/10">
                            <AccountCircleIcon fontSize="medium" />
                        </div>

                        <div className="flex flex-col">
                            <h6 className="text-text-main font-bold tracking-tight leading-tight">
                                Основная информация
                            </h6>
                            {isPrivate && (
                                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest flex items-center gap-1 mt-1">
                                    <LockIcon style={{ fontSize: 10 }} /> Приватный профиль
                                </span>
                            )}
                        </div>
                    </div>

                    {isMyProfile && (
                        <Button
                            className="
                               !min-w-[44px] !w-11 !h-11 !rounded-xl
                               !bg-surface hover:!bg-brand/10
                               !border !border-border-default hover:!border-brand/30
                               !text-text-muted hover:!text-brand
                               !transition-all !duration-300
                            "
                            onClick={openEdit}
                        >
                            <EditIcon fontSize="small" />
                        </Button>

                    )}

                </header>

                <main className="flex flex-col gap-8 flex-grow">

                    {/* --- BIO BLOCK --- */}
                    {/* Делаем его более интегрированным, без жестких рамок */}
                    <div className={`relative pl-4 border-l-4 ${trueUser?.bio ? 'border-brand' : 'border-border-default'} py-1 transition-colors duration-300`}>
                        <p className="text-label mb-2 opacity-80">
                            Обо мне
                        </p>

                        <p className="text-secondary text-text-main/90 leading-relaxed whitespace-pre-line font-medium">
                            {trueUser?.bio ? (
                                trueUser.bio
                            ) : (
                                <span className="text-text-muted font-normal italic opacity-70">
                                    Пользователь предпочел не рассказывать о себе...
                                </span>
                            )}
                        </p>
                    </div>


                    {/* --- CONTENT AREA (Grid or Private Placeholder) --- */}
                    {isPrivate ? (
                        <div className="flex-grow flex flex-col items-center justify-center py-8 px-4 text-center rounded-2xl bg-background/50 border border-border-default border-dashed">
                            <div className="p-4 rounded-full bg-border-default/30 text-text-muted mb-3">
                                <HttpsIcon fontSize="large" />
                            </div>
                            <h5 className="text-text-main font-semibold mb-1">Доступ ограничен</h5>
                            <p className="text-small text-text-muted max-w-[250px]">
                                Контактные данные и детальная информация скрыты настройками приватности.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">

                            {/* Activity Column */}
                            <div className="flex flex-col gap-2">
                                <SectionTitle colorClass="bg-brand" title="Деятельность" />

                                <div className="flex flex-col gap-3">
                                    {activityList?.length > 0 ? activityList.map((elem: Elems, i: number) => (
                                        <div
                                            key={i}
                                            className="
                                                group flex items-center p-3 -mx-3 rounded-xl
                                                hover:bg-text-main/5 transition-all duration-200 cursor-default
                                            "
                                        >
                                            <div className="text-text-muted group-hover:text-brand transition-colors duration-200 mr-3 opacity-80">
                                                {/* Рендерим иконку внутри контейнера для контроля размера */}
                                                {elem?.Icon && <elem.Icon  />}
                                            </div>
                                            <div className="flex flex-col">
                                                {/* Здесь предполагается, что Elem рендерит ключ и значение.
                                                     Если Elem это сложный компонент, лучше использовать его как есть,
                                                     но если есть возможность стилизовать - используем классы выше */}
                                                <Elem Icon={null} k={elem?.k} value={elem?.value} />
                                            </div>
                                        </div>
                                    )) : (
                                        <span className="text-small text-text-muted italic opacity-60 ml-2">Нет данных</span>
                                    )}
                                </div>
                            </div>

                            {/* Contact Column */}
                            <div className="flex flex-col gap-2 lg:pl-8 lg:border-l lg:border-border-default/60">
                                <SectionTitle colorClass="bg-green-main" title="Контакты" />

                                <ul className="flex flex-col gap-3">
                                    {contactList?.length > 0 ? contactList.map((elem: Elems, i: number) => (
                                        <li
                                            key={i}
                                            className="
                                                group p-3 -mx-3 rounded-xl bg-surface border border-transparent
                                                hover:border-border-default hover:shadow-sm hover:bg-background
                                                transition-all duration-200
                                            "
                                        >
                                            <Elem Icon={elem?.Icon} k={elem?.k} value={elem?.value} />
                                        </li>
                                    )) : (
                                        <span className="text-small text-text-muted italic opacity-60 ml-2">Скрыто или не указано</span>
                                    )}
                                </ul>
                            </div>

                        </div>
                    )}
                </main>
            </div>

            {modalEdit}

        </section>
    );
}