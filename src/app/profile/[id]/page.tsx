"use client"

import ProfileWidget from "@/widgets/user/profile/ui/profile/ui/ProfileWidget";
import DocumentsWidget from "@/widgets/user/documents-widget/DocumentsWidget";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/entities/user";
import { $fetch } from "@/shared/api/fetch";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import { PrivateProfileWidget } from "@/widgets/user/profile/ui/profile/ui/PrivateProfileWidget";
import ProjectsWidget from "@/widgets/user/projects-widget/ProjectsWidget";
import StacksWidget from "@/widgets/user/stacks-widget/StacksWidget";
import DesertScene from "@/shared/assets/images/vector/empty/DesertScene";
import SubscriptionOffer from "@/widgets/user/subscription-offer/SubscriptionOffer";

const DEFAULT_SECTIONS = [
    { name: "documents", default_sort: 1 },
    { name: "stacks", default_sort: 2 },
    { name: "projects", default_sort: 3 },
];

export default function Page() {
    // === ПОДКЛЮЧЕНИЕ ПОЛИФИЛА ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ===
    useEffect(() => {
        if (typeof window !== "undefined") {
            require("drag-drop-touch");
        }
    }, []);

    const { user } = useContext(UserContext);
    const params = useParams();
    const url_base = params?.id;

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [trueUser, setTrueUser] = useState<Record<string, any> | null>(user);

    useEffect(() => {
        if (url_base && user?.main?.short_id) {
            setIsMyProfile(
                Boolean(user?.main?.short_id.toLowerCase() == url_base) ||
                Boolean(user?.main?.username?.toLowerCase() == url_base)
            );
        }
    }, [user, url_base]);

    useEffect(() => {
        if (user && user?.main?.id === trueUser?.main?.id) {
            setTrueUser(user);
        }
    }, [user]);

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

    const isPrivate = !isMyProfile && Boolean(trueUser?.main?.is_uploaded) === false;

    const [filledSections, setFilledSections] = useState({
        documents: false,
        stacks: false,
        projects: false
    });

    const hasContent = isMyProfile || Object.values(filledSections).some(Boolean);

    const [sectionsOrder, setSectionsOrder] = useState(DEFAULT_SECTIONS);
    const [sectionsSort, setSectionsSort] = useState<Record<string, any>[] | null>(null);

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    async function getSectionsSort() {
        const response = await $fetch(`get_sort/${trueUser?.main?.id}`);
        const sort = response?.json?.sections;
        if (sort) {
            setSectionsSort(sort);
        }
    }

    useEffect(() => {
        if (trueUser?.main?.id) {
            getSectionsSort();
        }
    }, [trueUser?.main?.id]);

    useEffect(() => {
        if (sectionsSort && Array.isArray(sectionsSort) && sectionsSort.length > 0) {
            const updated = DEFAULT_SECTIONS.map(section => {
                const backendItem = sectionsSort.find(b => b.name === section.name);
                return {
                    ...section,
                    id: backendItem?.id || null,
                    sort: backendItem?.sort !== undefined ? backendItem.sort : section.default_sort
                };
            });

            const sorted = [...updated].sort((a, b) => (a.sort || 0) - (b.sort || 0));
            setSectionsOrder(sorted);
        }
    }, [sectionsSort]);

    async function handleSortSave(newOrder: typeof DEFAULT_SECTIONS) {
        const payload = newOrder.map((section: any, index) => ({
            id: section.id,
            sort: index + 1
        })).filter(item => item.id);

        const response = await $fetch("me/sections/sort", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "sections": payload
            })
        });

        if (!response?.json?.offer_subscription) {
            setSectionsOrder(newOrder);
        }
    }

    const handleDragStart = (index: number) => {
        if (!isMyProfile) return;
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (targetIndex: number) => {
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updatedOrder = [...sectionsOrder];
        const [draggedItem] = updatedOrder.splice(draggedIndex, 1);
        updatedOrder.splice(targetIndex, 0, draggedItem);

        handleSortSave(updatedOrder);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <Layout>
            <div className="flex flex-col w-full">
                <ProfileWidget isMyProfile={isMyProfile} isPrivate={isPrivate} trueUser={trueUser} />

                {!isPrivate ? (
                    <>
                        <div className={`flex flex-col gap-5 ${hasContent || isMyProfile ? 'py-5' : 'hidden'}`}>

                            {sectionsOrder.map((section, index) => {
                                let componentNode: React.ReactNode = null;

                                if (section.name === "documents") {
                                    componentNode = (
                                        <DocumentsWidget
                                            isMyProfile={isMyProfile}
                                            trueUser={trueUser}
                                            setIsEmpty={(hasData) => setFilledSections(p => ({ ...p, documents: hasData }))}
                                        />
                                    );
                                } else if (section.name === "stacks") {
                                    componentNode = (
                                        <StacksWidget
                                            isMyProfile={isMyProfile}
                                            trueUser={trueUser}
                                            setIsEmpty={(hasData) => setFilledSections(p => ({ ...p, stacks: hasData }))}
                                        />
                                    );
                                } else if (section.name === "projects") {
                                    componentNode = (
                                        <ProjectsWidget
                                            isMyProfile={isMyProfile}
                                            trueUser={trueUser}
                                            setIsEmpty={(hasData) => setFilledSections(p => ({ ...p, projects: hasData }))}
                                        />
                                    );
                                }

                                if (!componentNode) return null;

                                return (
                                    <div
                                        key={section.name}
                                        // Оставляем только обработчики дропа (чтобы сюда можно было бросить элемент)
                                        onDragOver={handleDragOver}
                                        onDrop={() => handleDrop(index)}
                                        className={`transition-all duration-200 relative select-none
                                            ${isMyProfile ? 'border border-transparent rounded-[18px]' : ''} 
                                            ${draggedIndex === index ? 'opacity-30 scale-[0.98]' : 'opacity-100'}`}
                                    >

                                        {/* РУЧКА ПЕРЕТАСКИВАНИЯ (Отображается только владельцу) */}
                                        {isMyProfile && (
                                            <div
                                                draggable={true}
                                                onDragStart={() => handleDragStart(index)}
                                                onDragEnd={handleDragEnd}
                                                className="relative w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing transition-all touch-none group/drag"
                                                title="Перетащить секцию"
                                            >
                                                {/* Маленькая закругленная плашка (капсула) */}
                                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-neutral-800 rounded-full group-hover/drag:bg-gray-400 dark:group-hover/drag:bg-neutral-600 group-active/drag:bg-gray-500 transition-colors" />

                                                {/* БЛОК С ПОДСКАЗКОЙ И ВИДЕО (Всплывает СВЕРХУ-СПРАВА при ховере) */}
                                                <div className="absolute bottom-full left-[calc(50%-24px)] mb-2 max-w-110 w-full p-4
                                                    glass-effect border border-gray-200 dark:border-neutral-800 rounded-[24px] shadow-xl
                                                    opacity-0 pointer-events-none transition-all duration-200 scale-95 origin-bottom z-50
                                                    md:group-hover/drag:opacity-100 md:group-hover/drag:scale-100
                                                    hidden md:flex flex-col gap-2"
                                                >
                                                    {/* Стрелочка подсказки снизу (смещена влево к центру ручки) */}
                                                    <div className="absolute -bottom-1 left-6 w-2 h-2 rotate-45 bg-white/80 dark:bg-neutral-900/80 border-b border-r border-gray-200 dark:border-neutral-800" />

                                                    <h5 className="text-sm font-bold text-text-main text-center">
                                                        Как сортировать профиль?
                                                    </h5>

                                                    <p className="text-xs text-text-muted text-center leading-relaxed">
                                                        Зажмите эту полоску и перетащите блок выше или ниже.
                                                    </p>

                                                    {/* ТВОЕ ВИДЕО */}
                                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/10 mt-1">
                                                        <video
                                                            src="/video/guide.mov"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Контент виджета */}
                                        {componentNode}
                                    </div>
                                );
                            })}
                        </div>

                        {!hasContent && !isMyProfile && (
                            <div className="glass-effect p-6 rounded-[18px] mt-4">
                                <h4 className="text-text-main font-bold">
                                    Пока что тут ничего нет...
                                </h4>
                                <DesertScene className="w-full h-full text-text-main" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mt-4">
                        <PrivateProfileWidget />
                    </div>
                )}
            </div>
        </Layout>
    );
}