"use client";

import React, {useContext, useEffect, useState} from "react";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Gallery from "@/entities/gallery/Gallery";
import SocialButton from "@/shared/ui/SocialButton/SocialButton";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/entities/user";
import UserHeader from "@/entities/user/ui/UserHeader";
import Like from "@/features/reactions/Like";
import CommentWidget from "@/widgets/user/comment-widget/CommentWidget";
import WriteComment from "@/features/write-comment/ui/WriteComment";
import {useIntersectionView} from "@/features/use-intersection-view/useIntersectionView";
import {useRouter} from "next/navigation";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import ExpandText from "@/shared/ui/expand-text/ExpandText";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import toast from "react-hot-toast";

interface Props {
    className?: string
    galleryClassName?: string
    event: Record<string, any> | null
    redirectOnClick?: boolean
    showComments?: boolean
    setEvents?: (any) => void
    show_description?: boolean
}

function CheckCircleOutlineIcon(props: { className: string }) {
    return null;
}

export default function EventWidget({
        event,
        redirectOnClick = false,
        className,
        galleryClassName,
        showComments = true,
        setEvents,
        show_description = true
    }: Props) {

    const { targetRef } = useIntersectionView({
        entityId: event?.id,
        entityType: "event",
        threshold: 0.3,
        delay: 1000,
        initialViewed: !!event?.is_viewed
    })

    const {user} = useContext(UserContext)
    const isMy = event?.user?.id == user?.main?.id
    const router = useRouter()

    const postActionButtons = [
        isMy && {
            text: "Редактировать",
            Icon: EditIcon,
            onClick: () => router.replace(`/edit/event/${event?.id}`)
        },
        isMy && {
            text: "Удалить",
            Icon: DeleteIcon,
            onClick: () => open()
        },
    ].filter(Boolean) as Record<string, any>[];

    async function deleteEvent(event_id: string) {
        const response = await $fetch(`events/${event_id}`, {
            method: "DELETE"
        })

        if (response?.response?.ok && setEvents) {
            setEvents((prev: any[]) => prev.filter(e => e.id !== event_id))
        }
    }

    const [showWriteComment, setShowWriteComment] = useState<boolean>(false)
    const [content, setContent] = useState<string>(event?.title || "")

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('input')) {
            return;
        }
        if (document.querySelector('.MuiPopover-root')) {
            return;
        }
        router.replace(`/events/${event?.id}`);
    };

    const {page: commentsPage, setPage: setCommentsPage, lastPage: commentsLastPage, setLastPage: setCommentsLastPage, perPage: commentsPerPage, setPerPage: setCommentsPerPage} =
        UsePaginate()

    const [comments, setComments] = useState<Record<string, any>[]>([])

    useEffect(() => {
        if (event?.comments) {
            setComments(event.comments);
        }
        if (event?.title) {
            setContent(event?.title)
        }
    }, [event])

    const {gallery} = useGalleryLogic({
        entity: "event",
        isClientOnly: true,
        existingEntityId: event?.id,
        galleryInit: event?.images
    })

    // async function getComments(page: number, id: string) {
    //     const response = await $fetch(`comments/get_morph?page=${page}&comments_limit=3&entity_id=${id}&entity=event`)
    //
    //     const comments_ = response?.json?.comments || []
    //     const per_page = response?.json?.per_page
    //     const last_page = response?.json?.last_page
    //
    //     if (comments_) {
    //         setComments(prev => [...prev, ...comments_])
    //     }
    //     if (per_page) setCommentsPerPage(per_page)
    //     if (last_page) setCommentsLastPage(last_page)
    // }
    //
    // useEffect(() => {
    //     if (showComments && event?.id) {
    //         getComments(commentsPage, event?.id)
    //     }
    // }, [event?.id]); // Зависимость от ID важнее, чем от всего объекта

    const {isOpen, open, close} = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close: close,
        callback: () => deleteEvent(event?.id)
    })

    // Проверка наличия медиа для стилизации границ
    const hasMedia = gallery && gallery.length > 0;

    const [signed, setSigned] = useState<boolean>(event?.is_signed_up || false)

    async function sign_up(event_id) {
        const response = await $fetch(`events/${event_id}/sign_up`, {
            method: "POST"
        })

        if (response?.response?.ok) {
            setSigned(true)
        }
    }

    useEffect(() => {
        if (event) {
            setSigned(event?.is_signed_up)
        }
    }, [event]);

    async function redirectToTasks(event_id) {
        const response = await $fetch(`events/map/${event_id}`)

        const tasks = response?.json?.tasks

        if (tasks && tasks?.length > 0) {
            router.replace(`/tasks/${tasks[0].id}`)
        } else {
            toast.success("Заданий не создано для этого мероприятия")
        }
    }

    return (
        <div ref={targetRef} className={`group relative w-full min-w-0 transition-all duration-300 ${className}`}>

            {/* Модальное окно подтверждения */}
            <Modal isOpen={isOpen} close={close} modalClassName="h-fit w-fit max-w-sm">
                <ConfirmationForm confirm={confirm} decline={decline} />
            </Modal>

            <div
                className={`
                    flex flex-col w-full rounded-2xl
                    transition-all duration-300 ease-out
                    ${redirectOnClick ? 'cursor-pointer' : ''}
                `}
                onClick={redirectOnClick ? (e) => handleCardClick(e) : undefined}
            >
                {/* Хедер пользователя */}
                <div className="pb-2">
                    <UserHeader
                        user={event?.user}
                        created_at={event?.created_at}
                        updated={event?.updated}
                        expandedButtons={postActionButtons}
                    />
                </div>

                {/* Контент */}
                <div className="flex-grow">

                    {/* Галерея */}
                    {hasMedia && (
                        <Gallery
                            className={`mt-2 mb-4 rounded-xl overflow-hidden max-h-[300px] h-full ${galleryClassName}`}
                            gallery={gallery}
                        />
                    )}

                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col">
                            <ExpandText
                                textClassName="text-large font-bold text-text-main"
                                text={content}
                                previewLength={100}
                                className="w-full"
                                canCloseOnExpanded={true}
                            />

                            {show_description && event?.description && (
                                <ExpandText
                                    textClassName="text-small text-text-muted leading-relaxed"
                                    text={event.description}
                                    previewLength={150}
                                    className="w-full mb-2"
                                    canCloseOnExpanded={true}
                                />
                            )}
                        </div>
                        {event?.type && (
                            <span className="inline-flex items-center px-2.5 py-1 text-tiny font-semibold glass-effect rounded-full text-text-main">
                                {event.type}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-3 p-3 bg-bg-main/50 rounded-xl border border-text-muted/20">

                        <p className="text-text-muted text-small">{event?.status}</p>

                        {event?.is_signed_up !== undefined && (
                            <div className={`flex items-center gap-2 text-small font-medium ${event?.is_signed_up ? 'text-green-500/70' : 'text-text-muted'}`}>
                                {event?.is_signed_up ? (
                                    <>
                                        <CheckCircleOutlineIcon className="!text-[16px]" />
                                        <span>Вы записаны</span>
                                    </>
                                ) : (
                                    <>
                                        <HighlightOffIcon className="!text-[16px]" />
                                        <span>Вы не записаны</span>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-small text-text-muted">
                            <PeopleAltOutlinedIcon className="!text-[16px] opacity-70" />
                            <span>
                                Участников: <span className="text-text-main font-medium">{event?.members_count}</span>
                                {event?.max_members ? (
                                    <span className="opacity-60"> / {event.max_members}</span>
                                ) : (
                                    <span className="opacity-60"> / ∞</span>
                                )}
                            </span>
                        </div>

                        {(event?.start || event?.end) && (
                            <div className="flex items-center gap-2 text-small text-text-muted">
                                <CalendarTodayIcon className="!text-[16px] opacity-70" />
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="text-text-main font-medium">{event?.start}</span>
                                    {event?.end && (
                                        <>
                                            <span className="hidden sm:inline opacity-40">—</span>
                                            <span className="text-text-main font-medium">{event?.end}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!signed && !["completed", "announce"].includes(event?.status) && (event?.config?.allow_sign_in_process || event?.status !== "process") &&
                    <BrandActionButton className="!my-3 !mb-4 max-w-[300px] w-full" onClick={() => sign_up(event?.id)}>
                        записаться
                    </BrandActionButton>
                }

                {event?.tasks &&
                event?.user?.id === user?.main?.id ?
                    <BrandActionButton className="!my-3 !mb-4 max-w-[300px] w-full" onClick={() => redirectToTasks(event?.id)}>
                        Смотреть задание
                    </BrandActionButton>
                    :
                    signed && event?.status === "process" &&
                    <BrandActionButton className="!my-3 !mb-4 max-w-[300px] w-full" onClick={() => redirectToTasks(event?.id)}>
                        Делать задания
                    </BrandActionButton>
                }

                {/*{signed && event?.status === "process" && event?.tasks &&*/}
                {/*    <BrandActionButton className="!my-3 !mb-4 max-w-[300px] w-full" onClick={() => redirectToTasks(event?.id)}>*/}
                {/*        Делать задания*/}
                {/*    </BrandActionButton>*/}
                {/*}*/}

                {/* Футер с действиями */}
                <div className="mt-auto">
                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-4">
                            <Like
                                is_liked={event?.is_liked}
                                likes_count={event?.likes_count}
                                entity={"event"}
                                entity_id={event?.id}
                                showLikes={true}
                            />

                            <SocialButton
                                count={event?.comments_count}
                                Icon={ChatBubbleOutlineOutlinedIcon}
                                onClick={(e: any) => {
                                    e?.stopPropagation();
                                    setShowWriteComment(prev => !prev);
                                }}
                            />
                        </div>

                        <SocialButton
                            count={event?.views_count}
                            Icon={RemoveRedEyeIcon}
                            hover={false}
                            className="opacity-60 hover:opacity-100"
                        />
                    </div>

                    {/* Секция комментариев */}
                    {showWriteComment && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <WriteComment
                                className="!py-2"
                                entity="event"
                                entity_id={event?.id}
                                setComments={setComments}
                            />
                        </div>
                    )}

                    {comments && Array.isArray(comments) && comments?.length > 0 && (
                        <div className="flex flex-col gap-3 py-4 mt-2">
                            {comments?.map((comment, i) => (
                                <CommentWidget
                                    comment={comment}
                                    key={comment.id || i}
                                    entity="event"
                                    entity_id={event?.id}
                                />
                            ))}

                            {commentsPage < commentsLastPage && commentsLastPage > 1 && (
                                <button
                                    className="text-xs font-bold text-text-muted hover:text-text-brand transition-colors duration-200 self-start"
                                    onClick={async () => {
                                        await setCommentsPage(prev => prev + 1)
                                    }}
                                >
                                    Загрузить еще комментарии
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}