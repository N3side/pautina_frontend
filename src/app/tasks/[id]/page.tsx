"use client";

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

    const { user } = useContext(UserContext);

    const [task, setTask] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [comments, setComments] = useState<any[]>([]);

    const {
        page,
        setPage,
        lastPage,
        setLastPage,
        perPage,
        setPerPage,
    } = UsePaginate();

    const loadTask = useCallback(async (taskId: string) => {
        if (!taskId) return;

        setLoading(true);

        try {
            const response = await $fetch(`tasks/${taskId}`);
            const task_ = response?.json?.task;

            if (task_) {
                setTask(task_);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const isMy = task?.user_id === user?.main?.id;

    const loadComments = useCallback(
        async (
            entityId: string,
            pageNum: number,
            append: boolean = false
        ) => {
            if (!entityId) return;

            setCommentsLoading(true);

            try {
                const response = await $fetch(
                    `tasks/get_tasks/${entityId}?page=${pageNum}&comments_limit=3`
                );

                const newComments = response?.json?.comments ?? [];

                if (append) {
                    setComments((prev) => [...prev, ...newComments]);
                } else {
                    setComments(newComments);
                }

                setLastPage(response?.json?.last_page ?? 1);
                setPerPage(response?.json?.per_page ?? 3);
            } finally {
                setCommentsLoading(false);
            }
        },
        [setLastPage, setPerPage]
    );

    useEffect(() => {
        if (!id) return;

        setComments([]);
        setPage(1);
        loadTask(id);
    }, [id, loadTask, setPage]);

    useEffect(() => {
        if (!id) return;

        if (!isMy) return;

        loadComments(id, page, page > 1);
    }, [id, page, isMy, loadComments]);

    const observerTarget = useIntersectionObserver(
        () => {
            if (!commentsLoading && page < lastPage) {
                setPage((prev) => prev + 1);
            }
        },
        page < lastPage && isMy
    );

    return (
        <Layout>
            <div className="w-full flex flex-col gap-4">
                <h6 className="text-text-main font-bold">Задание</h6>

                <div className="glass-effect p-6 rounded-2xl flex flex-col gap-6 w-full h-full">
                    {task && (
                        <Task
                            task={task}
                            className="!w-full !h-full"
                            redirectOnClick={false}
                        />
                    )}

                    {!task?.my_comment && task?.id && (
                        <WriteComment
                            placeholder="Создать ответ на задание"
                            entity="task"
                            entity_id={task.id}
                            setComments={setComments}
                            className="mt-2"
                        />
                    )}

                    {task?.id &&
                        comments.find((c) => c.user.id === user?.main?.id) && (
                            <CommentWidget
                                comment={comments.find(
                                    (c) => c.user.id === user?.main?.id
                                )}
                                entity="task"
                                entity_id={task.id}
                            />
                        )}
                </div>

                {isMy && (
                    <div className="glass-effect p-6 rounded-2xl flex flex-col gap-4 w-full h-full">
                        <p className="text-text-main font-bold">
                            Ответы от пользователей:
                        </p>

                        {comments.length > 0 ? (
                            <>
                                {comments.map((c: any) => (
                                    <CommentWidget
                                        key={c.id}
                                        comment={c}
                                        entity="task"
                                        entity_id={task?.id}
                                    />
                                ))}

                                {page < lastPage && (
                                    <div
                                        ref={observerTarget}
                                        className="h-10 flex justify-center items-center"
                                    >
                                        {commentsLoading && (
                                            <p className="text-sm text-text-muted animate-pulse">
                                                Загрузка...
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            !commentsLoading && (
                                <p className="text-text-muted font-medium">
                                    Никто не загрузил работы
                                </p>
                            )
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}