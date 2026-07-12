"use client"

import Task from "@/entities/Task/Task";
import { usePathname } from "next/navigation";
import { $fetch } from "@/shared/api/fetch";
import React, { useContext, useEffect, useState } from "react";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import { UserContext } from "@/entities/user";
import WriteComment from "@/features/write-comment/ui/WriteComment";
import CommentWidget from "@/widgets/user/comment-widget/CommentWidget";

export default function Page() {
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const [task, setTask] = useState<Record<string, any> | null>(null);

    // 1. Добавляем состояние для списка комментариев (ответов)
    const [comments, setComments] = useState<any[]>([]);

    async function getTask(taskId: string) {
        if (!taskId) return;
        const response = await $fetch(`tasks/${taskId}`);
        const task_ = response?.json?.task;

        if (task_) {
            setTask(task_);
            // 2. Инициализируем список комментариев из данных задачи
            if (task_.comments && Array.isArray(task_.comments)) {
                setComments(task_.comments);
            }
        }
    }

    useEffect(() => {
        if (id) {
            getTask(id);
        }
    }, [id]);

    const { user } = useContext(UserContext);
    const isMy = task?.user_id === user?.main?.id;

    return (
        <Layout>
            <div className="w-full flex flex-col gap-4">
                <h6 className="text-text-main font-bold">Задание</h6>

                <div className="glass-effect p-6 rounded-2xl flex flex-col gap-6 w-full h-full">
                    {task && <Task task={task} className="!w-full !h-full" redirectOnClick={false} />}

                    {/* Форма отправки */}
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

                {/* Список всех ответов (для автора задания) */}
                {isMy && (
                    <div className="glass-effect p-6 rounded-2xl flex flex-col gap-4 w-full h-full">
                        <p className="text-text-main font-bold">Ответы от пользователей:</p>

                        <div className="flex flex-col gap-2">
                            {/* Используем локальное состояние comments, которое обновляется автоматически */}
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
                                </div>
                            ) : (
                                <p className="text-text-muted font-medium">Никто не загрузил работы</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}