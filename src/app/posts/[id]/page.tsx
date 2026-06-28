"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import Input from "@/shared/ui/Inputs/Input";
import SearchIcon from "@mui/icons-material/Search";
import SubscriptionSectionOffer from "@/widgets/user/subscription-offer/SubscriptionSectionOffer";
import {$fetch} from "@/shared/api/fetch";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import Link from "next/link";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import PostWidget from "@/widgets/user/post-widget/PostWidget";

export default function Page() {

    const params = useParams();
    const post_id = params?.id;

    const [post, setPost] = useState<Record<string, any> | null>(null)

    async function getPost() {
        const response = await $fetch(`posts/${post_id}`)

        const post_ = response?.json?.post

        if (post_) {
            setPost(post_)
        }
    }

    useEffect(() => {
        getPost()
    }, []);

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

                <PostWidget post={post} setPosts={() => {}} />

            </div>
        </Layout>
    )
}