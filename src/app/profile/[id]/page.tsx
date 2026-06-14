"use client"

import ProfileWidget from "@/widgets/user/profile/ui/profile/ui/ProfileWidget";
import DocumentsWidget from "@/widgets/user/documents-widget/DocumentsWidget";
import { useParams } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext } from "@/entities/user-entity";
import { $fetch } from "@/shared/api/fetch";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import { PrivateProfileWidget } from "@/widgets/user/profile/ui/profile/ui/PrivateProfileWidget";
import ProjectsWidget from "@/widgets/user/projects-widget/ProjectsWidget";
import StacksWidget from "@/widgets/user/stacks-widget/StacksWidget";
import DesertScene from "@/shared/assets/images/vector/empty/DesertScene";

const DEFAULT_SECTIONS = [
    { name: "documents", default_sort: 1 },
    { name: "stacks", default_sort: 2 },
    { name: "projects", default_sort: 3 },
];

export default function Page() {
    // === ПОДКЛЮЧЕНИЕ ПОЛИФИЛА ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ===
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Подгружаем полифил только в браузере
            require("drag-drop-touch");
        }
    }, []);

    const { user } = useContext(UserContext);
    const params = useParams();
    const url_base = params?.id;

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [trueUser, setTrueUser] = useState<Record<string, any> | null>(user);

    useEffect(() => {
        if (url_base && user?.publication?.public_url) {
            setIsMyProfile(
                user?.publication?.public_url?.toLowerCase() === url_base ||
                user?.main?.username?.toLowerCase() === url_base
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

    const isPrivate = !isMyProfile && Boolean(trueUser?.publication?.is_uploaded) === false;

    const [filledSections, setFilledSections] = useState({
        documents: false,
        stacks: false,
        projects: false
    });

    const hasContent = isMyProfile || Object.values(filledSections).some(Boolean);

    const [sectionsOrder, setSectionsOrder] = useState(DEFAULT_SECTIONS);
    const [sectionsSort, setSectionsSort] = useState<Record<string, any>[] | null>(null);

    // Храним индекс элемента, который сейчас тащим
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

        if (response?.response?.ok) {
            console.log(newOrder);
            setSectionsOrder(newOrder);
        }
    }

    // --- НАЧАЛО ЛОГИКИ DRAG AND DROP ---

    const handleDragStart = (index: number) => {
        if (!isMyProfile) return;
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        // Обязательно отменяем дефолтное поведение, иначе drop не сработает
        e.preventDefault();
    };

    const handleDrop = (targetIndex: number) => {
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updatedOrder = [...sectionsOrder];
        // Вырезаем тащимый элемент
        const [draggedItem] = updatedOrder.splice(draggedIndex, 1);
        // Вставляем его на новое место
        updatedOrder.splice(targetIndex, 0, draggedItem);

        // Обновляем локальный стейт, чтобы всё мгновенно перерисовать
        setSectionsOrder(updatedOrder);

        // Отправляем новый порядок на бэкенд
        handleSortSave(updatedOrder);

        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    // --- КОНЕЦ ЛОГИКИ DRAG AND DROP ---

    return (
        <Layout>
            <div className="flex flex-col w-full">
                <ProfileWidget isMyProfile={isMyProfile} isPrivate={isPrivate} trueUser={trueUser} />

                {!isPrivate ? (
                    <>
                        <div className={`flex flex-col gap-5 ${hasContent || isMyProfile ? 'py-5' : 'hidden'}`}>

                            {/* Рендерим отсортированный массив */}
                            {sectionsOrder.map((section, index) => {
                                // Переменная для хранения внутренностей виджета
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
                                        draggable={isMyProfile} // Таскать можно только в своем профиле
                                        onDragStart={() => handleDragStart(index)}
                                        onDragOver={handleDragOver}
                                        onDrop={() => handleDrop(index)}
                                        onDragEnd={handleDragEnd}
                                        // Стили: меняем курсор на "руку" и плавно уменьшаем непрозрачность перетаскиваемого элемента
                                        className={`transition-all duration-200 select-none 
                                            ${isMyProfile ? 'cursor-grab active:cursor-grabbing border border-transparent active:border-dashed active:border-gray-300 rounded-[18px]' : ''} 
                                            ${draggedIndex === index ? 'opacity-30 scale-[0.98]' : 'opacity-100'}`}
                                    >
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