"use client"

import Task from "@/entities/Task/Task";
import { usePathname } from "next/navigation";
import { $fetch } from "@/shared/api/fetch";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import { UserContext } from "@/entities/user";
import WriteComment from "@/features/write-comment/ui/WriteComment";
import CommentWidget from "@/widgets/user/comment-widget/CommentWidget";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

export default function Page() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const [task, setTask] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [comments, setComments] = useState<any[]>([]);

    const { page, setPage, lastPage, setLastPage, perPage, setPerPage } = UsePaginate();

    const loadTask = useCallback(async (taskId: string) => {

        if (!taskId) return;

        setLoading(true);
        const response = await $fetch(`tasks/${taskId}`);
        const task_ = response?.json?.task;

        if (task_) {
            setTask(task_);
        }

        setLoading(false)
    }, []);

    const loadComments = useCallback(async (entityId: string, pageNum: number, append: boolean = false) => {

        if (!entityId) return;

        setCommentsLoading(true);

        const response = await $fetch(
            `comments/get_morph?entity=task&entity_id=${entityId}&page=${pageNum}&comments_limit=3`
        );

        const json = response?.json;
        const newComments = json.comments || [];

        const totalPages = json.last_page;
        const currentPage = json.current_page;
        const itemsPerPage = json.per_page;

        if (append) {
            setComments(prev => [...prev, ...newComments]);
        } else {
            setComments(newComments);
        }

        if (totalPages) setLastPage(totalPages);
        if (itemsPerPage) setPerPage(itemsPerPage);

        setCommentsLoading(false);
    }, []);

    useEffect(() => {
        if (id) {
            loadTask(id);
        }
    }, [id, loadTask]);

    useEffect(() => {
        if (id) {
            const isAppend = page > 1;
            loadComments(id, page, isAppend);
        }
    }, [id, page, loadComments]);

    const { user } = useContext(UserContext);
    const isMy = user && task?.user_id === user?.main?.id;

    const observerTarget = useIntersectionObserver(
        () => {
            if (!commentsLoading && page < lastPage) {
                setPage(prev => prev + 1);
            }
        },
        [commentsLoading, page, lastPage],
        page < lastPage
    );

    return (
        <Layout>
            <div className="w-full flex flex-col gap-4">
                <h6 className="text-text-main font-bold">Задание</h6>

                <div className="glass-effect p-6 rounded-2xl flex flex-col gap-6 w-full h-full">
                    {task && <Task task={task} className="!w-full !h-full" redirectOnClick={false} />}

                    {!task?.my_comment && task?.id && (
                        <WriteComment
                            placeholder="Создать ответ на задание"
                            entity="task"
                            entity_id={task.id}
                            setComments={setComments}
                            className="mt-2"
                        />
                    )}

                    {task?.id && comments.find((c) => c.user.id === user?.main?.id) && (
                        <CommentWidget
                            comment={comments.find((c) => c.user.id === user?.main?.id)}
                            entity={"task"}
                            entity_id={task.id}
                        />
                    )}
                </div>

                {isMy && (
                    <div className="glass-effect p-6 rounded-2xl flex flex-col gap-4 w-full h-full">
                        <p className="text-text-main font-bold">Ответы от пользователей:</p>

                        <div className="flex flex-col gap-2">
                            {comments.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {comments.map((c: any) => (
                                        <CommentWidget
                                            key={c.id}
                                            comment={c}
                                            entity="task"
                                            entity_id={task?.id}
                                        />
                                    ))}

                                    {page < lastPage && (
                                        <div ref={observerTarget} className="h-10 w-full flex justify-center items-center">
                                            {commentsLoading && <p className="text-sm text-text-muted animate-pulse">Загрузка...</p>}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                !commentsLoading && <p className="text-text-muted font-medium">Никто не загрузил работы</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}