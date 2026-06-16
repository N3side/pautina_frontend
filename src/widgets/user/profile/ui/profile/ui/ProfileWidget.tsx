"use client"

import React, {useContext} from "react";
import User from "@/entities/user/ui/User"
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import UploadPhoto from "@/widgets/user/profile/ui/profile/ui/UploadPhoto";
import UserSkeleton from "@/widgets/user/edit-user-info/ui/user-skeleton";
import {dots} from "@/shared/styles/patterns/dots";

interface Props {
    isMyProfile: boolean
    isPrivate: boolean
    trueUser: Record<string, any> | null
    showModals?: boolean
    isPremium?: boolean
}

export default function ProfileWidget({ isMyProfile, isPrivate, trueUser, showModals=true, isPremium=false }: Props) {

    const {setUser} = useContext(UserContext)

    async function changeHeader(blob) {
        const formData = new FormData()
        formData.set("header", blob)

        const response = await $fetch("me/update/user", {
            method: "PATCH",
            body: formData
        })

        const user = response?.json?.user
        if (user) {
            setUser(user)
        }
    }

    if (!trueUser) return <UserSkeleton />

    return (
        <div className="relative w-full">

            <div className="left-0 absolute h-[230px] w-full glass-effect rounded-t-[18px] overflow-hidden" style={{
                backgroundImage: `url("${dots}")`,
            }}>

                {isMyProfile &&
                    <div className="!absolute !top-[20px] !right-[20px]">
                        <UploadPhoto
                            onSave={changeHeader}
                            cropShape="rect"
                            aspect={448 / 100}
                        >
                            <ActionButton component="div" text="загрузить шапку" Icon={EditOutlinedIcon} className="glass-effect !bg-surface"  />
                        </UploadPhoto>
                    </div>
                }

                <img className={`w-full h-full object-cover  ${!trueUser?.main?.header && "hidden" }`} src={trueUser?.main?.header} alt=""/>
            </div>

            <div className={`w-full mt-[215px] relative glass-effect p-8 rounded-[18px] flex justify-between items-center flex-col lg:flex-row`}>
                <User user={trueUser} isMyProfile={isMyProfile} isPrivate={isPrivate} showModals={showModals} isPremium={isPremium} />
                {isMyProfile &&
                    <div>
                        <div className="flex gap-2 hidden xl:flex">
                            <Link href="/edit">
                                <ActionButton className="h-fit" text="Редактировать профиль" />
                            </Link>
                            <Link href="/edit?step=settings">
                                <ActionButton className="h-fit" text="Настройки" />
                            </Link>
                        </div>
                        <div className="absolute top-4 right-4 flex xl:hidden gap-2 flex-col">
                            <Link href="/edit">
                                <IconWrapper>
                                    <EditOutlinedIcon className="!text-[18px]" />
                                </IconWrapper>
                            </Link>
                            <Link href="/edit?step=settings">
                                <IconWrapper>
                                    <SettingsIcon className="!text-[18px]" />
                                </IconWrapper>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}