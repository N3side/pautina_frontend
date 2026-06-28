"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import Input from "@/shared/ui/Inputs/Input";
import SearchIcon from "@mui/icons-material/Search";
import SubscriptionSectionOffer from "@/widgets/user/subscription-offer/SubscriptionSectionOffer";
import {$fetch} from "@/shared/api/fetch";
import {useParams} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import Link from "next/link";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import UserHeader from "@/entities/user/ui/UserHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {UserContext} from "@/entities/user";
import Gallery from "@/entities/gallery/Gallery";
import Like from "@/features/reactions/Like";
import SocialButton from "@/shared/ui/SocialButton/SocialButton";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CommentWidget from "@/widgets/user/comment-widget/CommentWidget";
import WriteComment from "@/features/write-comment/WriteComment";
import UsePaginate from "@/shared/lib/hooks/usePaginate";

export default function Page() {

    const params = useParams();
    const post_id = params?.id;

    const [post, setPost] = useState<Record<string, any> | null>(null)
    const [comments, setComments] = useState<Record<string, any>[]>([])

    async function getPost() {
        const response = await $fetch(`posts/${post_id}`)

        const post_ = response?.json?.post

        if (post_) {
            setPost(post_)
        }
    }

    const {page: commentsPage, setPage: setCommentsPage, lastPage: commentsLastPage, setLastPage: setCommentsLastPage, perPage: commentsPerPage, setPerPage: setCommentsPerPage} = UsePaginate()

    async function getComments(page, post_id) {
        const response = await $fetch(`posts/${post_id}/comments?page=${page}&comments_limit=6`)

        const comments_ = response?.json?.comments || []
        const per_page = response?.json?.per_page
        const last_page = response?.json?.last_page
        if (comments_) {
            setComments(prev => {
                const currentComments = Array.isArray(prev) ? prev : []
                return [...currentComments, ...comments_]
            })
        }
        if (per_page) {
            setCommentsPerPage(per_page)
        }
        if (last_page) {
            setCommentsLastPage(last_page)
        }
    }

    const {user} = useContext(UserContext)

    const isMyPost = post?.user?.id == user?.id

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

    useEffect(() => {
        getPost()
    }, []);

    useEffect(() => {
        if (post && post?.id) {
            getComments(commentsPage, post?.id)
        }
    }, [post, commentsPage]);

    const [gallery, setGallery] = useState<Record<string, any>[] | null>(post?.gallery || null)
    const [showWriteComment, setShowWriteComment] = useState<boolean>(true)

    useEffect(() => {
        setGallery(post?.gallery)
        setComments(post?.comments)
    }, [post]);

    // useEffect(() => {
    //     console.log(commentsPage, commentsLastPage)
    // }, [commentsPage, commentsLastPage]);

    return (
        <Layout
            className="gap-4"
            rightChildren={
                <div className="flex flex-col gap-3 w-full max-w-[350px] h-fit sticky top-[15px] self-start">
                    <Input className="w-full" inputClassName="!rounded-3xl" placeholder="Поиск" leftAdditional={<SearchIcon />} />
                    <SubscriptionSectionOffer />
                </div>
            }
        >
            <div className="flex flex-col gap-4 p-6 max-w-[650px] w-full glass-effect rounded-2xl">
                <Link href="/feed" className="flex items-center gap-6">
                    <RoundedIconWrapper hitboxWidth={40} hitboxHeight={40} Icon={ArrowBack} />
                    <p className="text-text-main font-bold text-default">Пост</p>
                </Link>

                <div className="mt-4 flex flex-col gap-2">
                    <UserHeader
                        user={post?.user}
                        created_at={post?.created_at}
                        updated_at={post?.updated_at}
                        updated={post?.updated}
                        expandedButtons={postActionButtons}
                    />

                    <Gallery className="mt-2" gallery={gallery} />

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

                    <WriteComment
                        className="mt-3.5 !py-3 z-100"
                        entity="post"
                        entity_id={post?.id}
                        setComments={setComments}
                    />


                    {
                        comments && Array.isArray(comments) && comments?.length > 0 &&
                        // Добавили overflow-x-auto и max-w-full
                        <div className="flex flex-col gap-2 mt-4 overflow-x-auto max-w-full z-100">

                            {comments?.map((comment, i) =>
                                <CommentWidget
                                    comment={comment}
                                    key={i}
                                    entity="post"
                                    entity_id={post?.id}
                                />
                            )}

                            {commentsPage < commentsLastPage && commentsLastPage !== 1 &&
                                <button className="text-text-muted font-bold w-fit" onClick={() => setCommentsPage(prev => prev + 1)}>
                                    Загрузить еще
                                </button>
                            }

                        </div>
                    }

                </div>

            </div>
        </Layout>
    )
}