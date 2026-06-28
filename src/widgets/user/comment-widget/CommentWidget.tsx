import UserHeader from "@/entities/user/ui/UserHeader";
import Like from "@/features/reactions/Like";
import React, {useContext, useEffect, useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {getRussianAnswers} from "@/shared/lib/utils/getRussianAnswers";
import {$fetch} from "@/shared/api/fetch";
import {ExpandLess} from "@mui/icons-material";
import WriteComment from "@/features/write-comment/WriteComment";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {UserContext} from "@/entities/user";
import {useModal} from "@/shared/lib/hooks/useModal";
import UseConfirmOperation from "@/features/confirm-operation/logic/useConfirmOperation";
import {Modal} from "@/shared/ui/Modals/Modal";
import ConfirmationForm from "@/features/confirm-operation/ui/confirmationForm";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import UsePaginate from "@/shared/lib/hooks/usePaginate";

interface Props {
    comment: Record<string, any> | null
    isChild?: boolean
    entity: string
    entity_id: string
}

export default function CommentWidget({comment, entity, entity_id, isChild=false}: Props) {

    const [commentState, setCommentState] = useState<Record<string, any> | null>(comment)
    const [content, setContent] = useState<string>(commentState?.content || "")

    const showChildren =
        commentState?.children && Array.isArray(commentState?.children) && commentState?.children?.length > 0 ||
        commentState?.comments_count > 0

    const [childComments, setChildComments] = useState<Record<string, any>[] | null>([])
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [openCommentation, setOpenCommentation] = useState<boolean>(false)
    const [isDeleted, setIsDeleted] = useState<boolean>(commentState?.deleted)
    const [fullDeleted, setIsFullDeleted] = useState<boolean>(false)

    const {page: commentsPage, setPage: setCommentsPage, lastPage: commentsLastPage, setLastPage: setCommentsLastPage, perPage: commentsPerPage, setPerPage: setCommentsPerPage} = UsePaginate()
    async function getCommentChildren(page, comment_id) {

        if (childComments && Array.isArray(childComments) && childComments?.length > 0 && !isExpanded) {
            setIsExpanded(true)
            return
        }

        const response = await $fetch(`comments/${comment_id}?page=${page}`)

        const children = response?.json?.comments

        if (children) {
            setIsExpanded(true)
            setChildComments(prev => [...prev, ...children])
        }
        const per_page = response?.json?.per_page
        const last_page = response?.json?.last_page
        if (per_page) {
            setCommentsPerPage(per_page)
        }
        if (last_page) {
            setCommentsLastPage(last_page)
        }
    }

    const {user} = useContext(UserContext)

    const isMyComment = commentState?.user_id === user?.id

    async function deleteComment(comment_id) {
        const response = await $fetch(`comments/${comment_id}`, {
            method: "DELETE"
        })

        if (response?.response?.ok) {
            setCommentState(null)
            if (response?.json?.comment?.deleted === true) {
                setIsDeleted(true)
            } else {
                setIsFullDeleted(true)
            }
        }
    }

    async function updateComment(comment_id) {
        const response = await $fetch(`comments/${comment_id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "content": content
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        const comment_ = response?.json?.comment
        if (comment_) {
            setCommentState(comment_)
            setIsEditing(false)
        }
    }

    const {open, close, isOpen} = useModal()
    const {confirm, decline} = UseConfirmOperation({
        close,
        callback: () => deleteComment(comment?.id)
    })

    const expandedButtons = [
        // {
        //     text: "Поделиться",
        //     Icon: ShareIcon
        // },
        !isDeleted && isMyComment && {
            text: "Редактировать",
            Icon: EditIcon,
            onClick: () => setIsEditing(prev => !prev)
        },
        !isDeleted && isMyComment && {
            text: "Удалить",
            Icon: DeleteIcon,
            onClick: () => open()
        },
    ]

    const [isEditing, setIsEditing] = useState<boolean>(false)

    useEffect(() => {
        if (comment && comment?.id && commentsPage > 1)
        getCommentChildren(commentsPage, comment?.id)
    }, [commentsPage]);

    return (
        !fullDeleted &&
        <div className="w-full min-w-[350px] shrink-0">

            <Modal isOpen={isOpen} modalClassName="!max-w-[600px] !max-h-[300px]" close={close}>
                <ConfirmationForm
                    confirm={confirm}
                    decline={decline}
                />
            </Modal>

            <div className="flex flex-col gap-1 w-full">
                <UserHeader
                    user={commentState?.user}
                    content={content}
                    setContent={setContent}
                    is_deleted={isDeleted}
                    updated={commentState?.updated}
                    created_at={commentState?.created_at}
                    updated_at={commentState?.updated_at}
                    size="mini"
                    isEditing={isEditing}
                    actionsAtEnd={false}
                    expandedButtons={expandedButtons}

                    portal={

                    <div className="w-full">

                        {!isEditing &&
                            <div className="flex justify-between items-center text-text-muted pr-2 w-full min-w-0">

                                <div className="flex items-center gap-3">

                                    <Like
                                        is_liked={commentState?.is_liked}
                                        likes_count={commentState?.likes_count}
                                        entity={"comment"}
                                        entity_id={commentState?.id}
                                    />

                                    <p className="text-text-main font-medium text-small select-none cursor-pointer"
                                       onClick={(e) => {
                                           e.stopPropagation()
                                           setOpenCommentation(prev => !prev)
                                       }}
                                    >
                                        Ответить
                                    </p>

                                </div>

                            </div>
                        }

                        {!isEditing && openCommentation &&
                            <WriteComment onClick={(e) => e.stopPropagation()} setExpanded={setIsExpanded} setOpenCommentation={setOpenCommentation} setComments={setChildComments} className="mt-2" parentComment={commentState} entity={entity} entity_id={entity_id}  />
                        }

                        {!isEditing && showChildren && !isExpanded &&
                            <div className="flex items-center gap-2 mt-3 cursor-pointer"
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     getCommentChildren(e, commentState?.id)
                                 }}
                            >
                                <p className="text-text-main font-semibold text-small select-none">{commentState?.comments_count} {getRussianAnswers(comment?.comments_count)}</p>
                                <ExpandMoreIcon className="!text-text-main" />
                            </div>
                        }

                        {!isEditing && childComments && Array.isArray(childComments) && childComments?.length > 0 && isExpanded &&
                            <div className="mt-4 flex relative w-full">

                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="absolute left-[18px] top-0 bottom-3 w-[2px] bg-neutral-700/50 hover:bg-neutral-400 transition-colors group cursor-pointer z-10 rounded-b-md"
                                    title="Свернуть ветку"
                                >
                                    <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-neutral-500/10 rounded transition-colors" />
                                </button>

                                <div className="flex flex-col gap-5 pl-9 w-full">
                                    {
                                        childComments.map((child, i) =>
                                            <CommentWidget
                                                key={i}
                                                comment={child}
                                                isChild={true}
                                                entity={entity}
                                                entity_id={entity_id}
                                            />)
                                    }

                                    {commentsPage < commentsLastPage && commentsLastPage > 1 &&
                                        <button className="text-text-muted font-bold w-fit hover:text-text-main transition-all duration-300" onClick={() => setCommentsPage(prev => prev + 1)}>
                                            Загрузить еще
                                        </button>
                                    }
                                </div>
                            </div>
                        }

                        {isEditing &&
                            <div className="flex gap-5 mt-3 items-center justify-end">
                                <p className="text-text-main cursor-pointer font-bold text-small" onClick={() => setIsEditing(prev => !prev)}>Отмена</p>
                                <ActionButton className="h-fit" text="Изменить" onClick={() => updateComment(commentState?.id)} />
                            </div>
                        }

                    </div>
                } />
            </div>
        </div>
    )
}