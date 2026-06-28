"use client";

import React, {useContext, useEffect, useState} from "react";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Gallery from "@/entities/gallery/Gallery";
import SocialButton from "@/shared/ui/SocialButton/SocialButton";
import {$fetch} from "@/shared/api/fetch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {UserContext} from "@/entities/user";
import {useModal} from "@/shared/lib/hooks/useModal";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import {Modal} from "@/shared/ui/Modals/Modal";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import UserHeader from "@/entities/user/ui/UserHeader";
import Like from "@/features/reactions/Like";
import CommentWidget from "@/widgets/user/comment-widget/CommentWidget";
import WriteComment from "@/features/write-comment/WriteComment";
import {useIntersectionView} from "@/features/use-intersection-view/useIntersectionView";
import {useRouter} from "next/navigation";
import usePagination from "@mui/material/usePagination";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import page from "@/app/maintenance/page";

interface Props {
    post: Record<string, any>;
    setPosts: (any) => void
}

export default function PostWidget({ post, setPosts }: Props) {

    const { targetRef } = useIntersectionView({
        entityId: post?.id,
        entityType: "post",
        threshold: 0.3,
        delay: 1000,
        initialViewed: !!post?.is_viewed
    })

    async function deletePost(post_id: string) {

        const response = await $fetch(`posts/${post_id}`, { method: "DELETE" });

        if (response?.response?.ok) {
            setPosts(prev => {
                return prev.filter(post_ => post?.id !== post_?.id)
            })
        }
    }

    const {user} = useContext(UserContext)

    const isMyPost = post?.user?.id == user?.id

    const {open, close, isOpen} = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close,
        callback: () => deletePost(post?.id)
    })

    const postActionButtons = [
        // {
        //     text: "Поделиться",
        //     Icon: ShareIcon
        // },
        isMyPost && {
            text: "Редактировать",
            Icon: EditIcon,
        },
        isMyPost && {
            text: "Удалить",
            Icon: DeleteIcon,
            onClick: () => open()
        },
    ]

    async function deleteImage(post_id, image_id) {
        const response = await $fetch(`posts/${post_id}/gallery/${image_id}`, {
            method: "DELETE"
        })
    }

    const [showWriteComment, setShowWriteComment] = useState<boolean>(false)
    const [gallery, setGallery] = useState<Record<string, any>[] | null>(post?.gallery || null)
    const [content, setContent] = useState<string>(post?.title || "")
    const {open: openEdit, close: closeEdit, isOpen: isOpenEdit} = useModal()

    const router = useRouter()

    const handleCardClick = (e: React.MouseEvent) => {
        // 1. Исключаем все элементы, которые ведут себя как кнопки или ссылки
        const target = e.target as HTMLElement;

        // Если кликнули на саму ссылку или кнопку - игнорируем
        if (target.closest('button') || target.closest('a') || target.closest('input')) {
            return;
        }

        // 2. САМОЕ ВАЖНОЕ: Проверяем, не открыт ли сейчас дропдаун или модалка
        // Если меню открыто, клик по пустому месту должен только закрыть меню, а не перекинуть на страницу
        if (document.querySelector('.MuiPopover-root')) {
            return;
        }

        router.push(`posts/${post?.id}`);
    };


    const [comments, setComments] = useState<Array<Record<string, any>>>([])
    const {page: commentsPage, setPage: setCommentsPage, lastPage: commentsLastPage, setLastPage: setCommentsLastPage, perPage: commentsPerPage, setPerPage: setCommentsPerPage} = UsePaginate()

    async function getComments(page, post_id) {
        const response = await $fetch(`posts/${post_id}/comments?page=${page}&comments_limit=3`)

        const comments_ = response?.json?.comments || []
        const per_page = response?.json?.per_page
        const last_page = response?.json?.last_page
        if (comments_) {
            setComments(prev => [...prev, ...comments_])
        }
        if (per_page) {
            setCommentsPerPage(per_page)
        }
        if (last_page) {
            setCommentsLastPage(last_page)
        }
    }

    useEffect(() => {
        if (post && post?.id) {
            getComments(commentsPage, post?.id)
        }
    }, [post, commentsPage]);

    return (
        <div ref={targetRef} className="transition-colors w-full min-w-0">

            <div className="flex flex-col w-full cursor-pointer" onClick={handleCardClick}>
                <UserHeader
                    user={post?.user}
                    created_at={post?.created_at}
                    updated_at={post?.updated_at}
                    updated={post?.updated}
                    expandedButtons={postActionButtons}
                    content={content}
                    setContent={setContent}
                    portal={
                        <div>
                            {
                                // isEditing ?
                                //     <EditGallery className="mt-2" cards={post?.gallery} setCards={setGallery} />
                                    // :
                                    <Gallery className="mt-2" gallery={gallery} />
                            }

                            {
                                // isEditing ?
                                //     <ShowStacks
                                //         className="my-2"
                                //         showSearch={true}
                                //         showAll={true}
                                //         showSelected={true}
                                //         selectedStacks={stacks}
                                //         setSelectedStacks={setStacks}
                                //     />
                                    // :
                                    // <OnlyShowStacks stacks={post?.stacks} />

                            }



                            <div className="flex justify-between items-center text-text-muted pr-2 mt-2 w-full min-w-0 !z-100">

                                <div className="flex items-center gap-5">

                                    <Like
                                        is_liked={post?.is_liked}
                                        likes_count={post?.likes_count}
                                        entity={"post"}
                                        entity_id={post?.id}
                                    />

                                    <SocialButton
                                        count={post?.comments_count}
                                        Icon={ChatBubbleOutlineOutlinedIcon}
                                        onClick={() => setShowWriteComment(prev => !prev)}
                                    />

                                </div>

                                <SocialButton
                                    count={post?.views_count}
                                    Icon={RemoveRedEyeIcon} hover={false}
                                />

                            </div>


                            {
                                comments && Array.isArray(comments) && comments?.length > 0 &&
                                // Добавили overflow-x-auto и max-w-full
                                <div className="flex flex-col gap-2 py-3 border-t-[0.1px] mt-2 border-text-muted/50 overflow-x-auto max-w-full z-100">
                                    {comments?.map((comment, i) =>
                                        <CommentWidget
                                            comment={comment}
                                            key={i}
                                            entity="post"
                                            entity_id={post?.id}
                                        />
                                    )}
                                    {commentsPage < commentsLastPage && commentsLastPage > 1 &&
                                        <button className="text-text-muted font-bold w-fit hover:text-text-main transition-all duration-300" onClick={() => setCommentsPage(prev => prev + 1)}>
                                            Загрузить еще
                                        </button>
                                    }
                                </div>
                            }

                            {showWriteComment &&
                                <WriteComment
                                    className="mt-4 !py-3 z-100"
                                    entity="post"
                                    entity_id={post?.id}
                                    setComments={setComments}
                                />
                            }


                        </div>
                    }
                />

                <Modal modalClassName="!max-w-[600px] !w-full !max-h-[300px] !h-full" isOpen={isOpen} close={close}>
                    <ConfirmationForm confirm={confirm} decline={decline} />
                </Modal>

            </div>
        </div>
    );
}