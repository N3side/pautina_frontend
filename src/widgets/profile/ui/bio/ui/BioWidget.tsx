"use client"

import React, {useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import HttpsIcon from '@mui/icons-material/Https';
import {Elem} from "@/widgets/profile/ui/bio/ui/Elem";
import {Elems, getActivityElems, getContactElems} from "@/widgets/profile/ui/bio/model";
import EditProfileForm from "@/features/edit-profile/ui/EditProfileForm";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import toast from "react-hot-toast";

const SectionTitle = ({ title }: {title: string }) => (
    <header className="flex items-center gap-3 mb-4">
        <div className={`w-1.5 h-1.5 rounded-full`}></div>
        <p className="text-label text-text-muted">
            {title}
        </p>
    </header>
);

export default function BioWidget({ isMyProfile, trueUser }: { isMyProfile: boolean, trueUser: Record<string, any> }) {

    const isPrivate = trueUser?.publication?.is_uploaded == false && !isMyProfile;

    const activityList = getActivityElems(trueUser);
    const contactList = getContactElems(trueUser);

    const {close, isOpen, open} = useModal()

    const copyToClipboard = async ({text, message}: {text: string, message?: string}) => {
        // Пробуем современный API
        if (navigator?.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                message && toast.success(message);
                return;
            } catch (err) {
                console.warn('Clipboard API failed, trying fallback', err);
            }
        }

        // Fallback для старых браузеров и не-https
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Делаем элемент невидимым
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();

            // Пробуем execCommand (старый метод)
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                message && toast.success(message);
            } else {
                toast.error("Не удалось скопировать. Попробуйте выделить текст вручную");
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
            toast.error("Не удалось скопировать ссылку");
        }
    };

    return (
        <section className="w-full h-full flex flex-col glass-effect border-border-glass rounded-[24px] transition-all duration-300">

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
                        <IconWrapper onClick={open}>
                            <EditIcon fontSize="small" />
                        </IconWrapper>
                    )}

                </header>

                <main className="flex flex-col gap-8 flex-grow">

                    {/* --- BIO BLOCK --- */}
                    {/* Делаем его более интегрированным, без жестких рамок */}
                    <div className={`relative pl-4 border-l-4 ${trueUser?.main?.bio ? 'border-brand' : 'border-border-default'} py-1 transition-colors duration-300`}>
                        <p className="text-label mb-2 opacity-80">
                            Обо мне
                        </p>

                        <p className="text-secondary text-text-main/90 leading-relaxed whitespace-pre-line font-medium">
                            {trueUser?.main?.bio ? (
                                trueUser?.main?.bio
                            ) : (
                                <span className="text-text-muted font-normal italic opacity-70">
                                    Пользователь предпочел не рассказывать о себе...
                                </span>
                            )}
                        </p>
                    </div>

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

                            <div className="flex flex-col gap-2">
                                <SectionTitle title="Деятальность" />

                                <ul className="flex flex-col gap-6">
                                    {activityList?.length > 0 ? activityList.map((elem: Elems, i: number) => (
                                        <Elem
                                            Icon={elem?.Icon}
                                            k={elem?.k}
                                            value={elem?.value}
                                            key={i}
                                        />
                                    )) : (
                                        <span className="text-small text-text-muted italic opacity-60 ml-2">Скрыто или не указано</span>
                                    )}
                                </ul>
                            </div>

                            {/* Contact Column */}
                            <div className="flex flex-col gap-2 lg:pl-8 lg:border-l lg:border-border-default/60">
                                <SectionTitle title="Контакты" />

                                <ul className="flex flex-col gap-6">
                                    {contactList?.length > 0 ? contactList.map((elem: Elems, i: number) => (
                                        <li
                                            key={i}
                                        >
                                            <Elem
                                                Icon={elem?.Icon}
                                                k={elem?.k}
                                                value={elem?.value}
                                                onCopy={() => copyToClipboard({text: elem.value || "скопировать", message: "Контакт успешно скопирован"})}
                                            />
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

            <Modal close={close} isOpen={isOpen}>
                <EditProfileForm close={close} />
            </Modal>

        </section>
    );
}