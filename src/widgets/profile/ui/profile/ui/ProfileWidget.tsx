"use client"

import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';
import UploadPhoto from "@/widgets/profile/ui/profile/ui/UploadPhoto";
import React, {useContext, useEffect} from "react";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import SubscriptionOffer from "@/widgets/SubscriptionOffer/SubscriptionOffer";
import BrandThin from "@/shared/ui/IconContainers/BrandThin";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import {UserContext} from "@/entities/user";

const StatItem = ({ count, label }: { count: number | string, label: string }) => (
    <div className="flex flex-col items-center justify-center p-3 transition-colors rounded-xl cursor-default group">
        <p className="text-large font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-brand)] transition-colors">
            {count}
        </p>
        <span className="text-tiny font-bold uppercase tracking-wider text-[var(--color-text-muted)] mt-0.5">
            {label}
        </span>
    </div>
);

export default function ProfileWidget({ isMyProfile, trueUser }: { isMyProfile: boolean, trueUser: Record<string, any> }) {

    const isPrivate = trueUser?.publication?.is_uploaded == false && !isMyProfile;

    const fullName = [trueUser?.main?.surname, trueUser?.main?.name, trueUser?.main?.patronymic].filter(Boolean).join("");

    const {isOpen, close, open} = useModal()

    return (
        <section
            className="
                relative flex flex-col w-full
                glass-effect rounded-[24px] overflow-hidden
                transition-all duration-300
                max-w-none lg:max-w-[386px]
                border border-[var(--color-glass-border)]
            "
        >

            <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" />

            <main className="relative flex flex-col flex-grow pt-8 px-6 pb-6 h-full z-10">

                <div className="relative flex justify-center mb-5">
                    <div className="absolute inset-0 bg-[var(--color-brand)]/20 blur-2xl rounded-full transform scale-75" />

                    <div className="relative w-[140px] h-[140px] rounded-full p-1">
                        <img
                            src={trueUser?.main?.avatar}
                            alt="avatar"
                            className="!w-full !h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        {isMyProfile && (
                            <div className="absolute bottom-1 right-1">
                                <UploadPhoto />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-1 mb-6">

                    <div className="flex gap-3 items-center">
                        <h5 className="text-[var(--color-text-main)] font-extrabold tracking-tight">
                            {trueUser?.main?.username ? `@${trueUser.main?.username}` : "Username"}
                        </h5>
                        {isMyProfile && trueUser?.access?.subscription?.name !== "premium" && (
                            <BrandThin onClick={open}>
                                <LockOutlineIcon className="text-text-brand" style={{fontSize: "20px"}} />
                            </BrandThin>
                        )}
                    </div>


                    <Modal
                        isOpen={isOpen}
                        close={close}
                        modalClassName="max-w-[700px]"
                    >
                        <SubscriptionOffer />
                    </Modal>

                    <p className="text-secondary font-medium text-[var(--color-text-muted)] line-clamp-2 px-2">
                        {fullName || "Без имени"}
                    </p>

                    {isPrivate && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-input)] border border-[var(--color-border-default)]">
                            <LockIcon sx={{ fontSize: 14 }} className="text-[var(--color-text-muted)]" />
                            <span className="text-tiny font-semibold text-[var(--color-text-muted)]">Профиль скрыт</span>
                        </div>
                    )}
                </div>

                {/* --- Content: Public vs Private --- */}
                {!isPrivate ? (
                    <>
                        {/* Action Button */}
                        <div className="w-full mb-6">
                            <Button
                                variant="contained"
                                disableElevation
                                className="!w-full !rounded-xl !py-3 !normal-case !text-[var(--color-brand)] !bg-[var(--color-brand)]/10 hover:!bg-[var(--color-brand)]/20 active:!scale-[0.98] transition-all border border-transparent hover:border-[var(--color-brand)]/20"
                            >
                                <div className="flex items-center gap-2">
                                    <DownloadIcon fontSize="small" />
                                    <span className="text-button-sm">Скачать портфолио</span>
                                </div>
                            </Button>
                        </div>

                        {/* Stats Footer */}
                        <div className="w-full grid grid-cols-2 gap-px rounded-2xl overflow-hidden ">
                            <StatItem count={trueUser?.main?.documents_count || 0} label="Документов" />
                            <StatItem count={trueUser?.main?.projects_count || 0} label="Проектов" />
                        </div>
                    </>
                ) : (
                    <div></div>
                )}
            </main>
        </section>
    );
}