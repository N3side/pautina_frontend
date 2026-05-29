"use client"

import ProfileWidget from "@/widgets/user/profile/ui/profile/ui/ProfileWidget";
import PortfolioWidget from "@/widgets/user/portfolio/ui/PortfolioWidget";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import {PrivateProfileWidget} from "@/widgets/user/profile/ui/profile/ui/PrivateProfileWidget";
import ProjectWidget from "@/widgets/user/portfolio/ui/ProjectWidget";
import ShowStacks from "@/features/manage-stacks/ui/ShowStacks";
import EditIcon from '@mui/icons-material/Edit';
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";


export default function Page() {
    const { user } = useContext(UserContext);
    const params = useParams();
    const url_base = params?.id;

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [trueUser, setTrueUser] = useState<Record<string, any> | null>(user);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Стейт для хранения выбранных стеков (для отображения и редактирования)
    const [selectedStacks, setSelectedStacks] = useState<Record<string, any>[]>([]);
    const [readOnly, setReadOnly] = useState(false)

    // Проверка прав владельца
    useEffect(() => {
        if (url_base && user?.publication?.public_url) {
            setIsMyProfile(
                user?.publication?.public_url?.toLowerCase() === url_base ||
                user?.main?.username?.toLowerCase() === url_base
            );
        }
    }, [user, url_base]);

    // Синхронизация данных текущего авторизованного юзера
    useEffect(() => {
        if (user && user?.main?.id === trueUser?.main?.id) {
            setTrueUser(user);
        }
    }, [user]);

    async function getUserStacks() {
        const response = await $fetch(`stacks/${trueUser?.main?.id}`)

        const stacks_ = response?.json?.stacks

        console.log(stacks_)

        if (stacks_) {
            setSelectedStacks(stacks_)
        }
    }

    // Наполнение стейта стеков данными просматриваемого пользователя
    useEffect(() => {
        if (trueUser) {
            getUserStacks()
        }
    }, [trueUser]);

    async function getUser() {
        const response = await $fetch(`user/${url_base}`);
        const user_ = response?.json?.user;
        if (user_) {
            setTrueUser(user_);
        }
    }

    useEffect(() => {
        if (!user) getUser();
    }, [user, url_base]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Функция мутации стеков (работает только для владельца профиля)
    const handleUpdateStacks = async (newStacks: Record<string, any>[]) => {
        setSelectedStacks(newStacks);

        const stackIds = newStacks.map(stack => stack.id);

        await $fetch(`stacks`, {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({
                stacks: stackIds || []
            })
        });
    };

    if (!isMounted) return null;

    const isPrivate = !isMyProfile && Boolean(trueUser?.publication?.is_uploaded) === false;

    return (
        <Layout>
            <div className="flex flex-col w-full">
                <ProfileWidget isMyProfile={isMyProfile} isPrivate={isPrivate} trueUser={trueUser} />

                {!isPrivate ? (
                    <div className="flex flex-col gap-5 py-5">

                        <PortfolioWidget isMyProfile={isMyProfile} trueUser={trueUser} />

                        {
                            <div className="glass-effect p-6 rounded-xl relative">

                                <h6 className="text-text-main font-bold">
                                    {
                                        isMyProfile ?
                                            `Ваш технологический стек ${selectedStacks.length < 1 ? "не заполнен. Нажмите на стеки, которыми владеете" : ""}`
                                        :
                                            `Технологический стек пользователя ${selectedStacks.length < 1 ? "пуст" : ""}`
                                    }
                                </h6>

                                {
                                    isMyProfile &&
                                    <IconWrapper
                                        onClick={() => setReadOnly(!readOnly)}
                                        className="!absolute !top-4 !right-6"
                                    >
                                        <EditIcon className="!text-[20px]" />
                                    </IconWrapper>
                                }

                                {readOnly && isMyProfile ? (
                                    <div className="flex flex-col gap-3 mt-7">
                                        <ShowStacks
                                            showSearch={true}
                                            showAll={true}
                                            showSelected={true}
                                            selectedStacks={selectedStacks}
                                            setSelectedStacks={(updater) => {
                                                const nextState = typeof updater === 'function' ? updater(selectedStacks) : updater;
                                                if (nextState) handleUpdateStacks(nextState);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    selectedStacks && Array.isArray(selectedStacks) && selectedStacks.length > 0 &&
                                    <div className="flex flex-col gap-4 mt-6">
                                        <ShowStacks
                                            showSearch={false}
                                            showAll={false}
                                            showSelected={true}
                                            selectedStacks={selectedStacks}
                                            isReadOnly={true} // Передаем true, всё лишнее скроется и заблокируется автоматически
                                        />
                                    </div>
                                )}
                            </div>
                        }

                        <ProjectWidget isMyProfile={isMyProfile} trueUser={trueUser} />
                    </div>
                ) : (
                    <div className="mt-4">
                        <PrivateProfileWidget />
                    </div>
                )}
            </div>
        </Layout>
    );
}