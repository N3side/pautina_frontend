"use client"

import { useEffect, useState } from "react";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import Input from "@/shared/ui/Inputs/Input";
import SubscriptionSectionOffer from "@/widgets/user/subscription-offer/SubscriptionSectionOffer";
import SearchIcon from '@mui/icons-material/Search';
import MakePostWidget from "@/widgets/user/make-post/MakePostWidget";
import PostEntity from "@/widgets/user/post-widget/PostWidget";
import { $fetch } from "@/shared/api/fetch";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

export default function Page() {
    const { page, setPage, lastPage, setLastPage } = UsePaginate();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Используем твой хук.
    // Коллбэк увеличивает страницу, если мы не грузимся и есть куда листать.
    const observerTarget = useIntersectionObserver(
        () => {
            if (!loading && page < lastPage) {
                setPage(prev => prev + 1);
            }
        },
        [loading, page, lastPage],
        page < lastPage
    );

    async function getPosts(pageNumber: number) {
        setLoading(true);
        const response = await $fetch(`posts?page=${pageNumber}`);
        const newPosts = response?.json?.posts;
        const lastPage_ = response?.json?.last_page;

        if (newPosts) {
            setPosts(prev => (pageNumber === 1 ? newPosts : [...prev, ...newPosts]));
        }
        if (lastPage_) {
            setLastPage(lastPage_);
        }
        setLoading(false);
    }

    useEffect(() => {
        getPosts(page);
    }, [page]);

    return (
        <Layout
            className="gap-4"
            rightChildren={
                <div className="flex flex-col gap-3 w-full max-w-[350px] h-fit">
                    <Input className="w-full" inputClassName="!rounded-3xl" placeholder="Поиск" leftAdditional={<SearchIcon />} />
                    <SubscriptionSectionOffer />
                </div>
            }
        >
            <div className="flex flex-col gap-4 max-w-[650px] w-full">

                <div className="glass-effect p-6 glass-effect rounded-2xl">
                    <MakePostWidget className="!mt-6" setPosts={setPosts} />
                </div>

                {posts.length > 0 && (
                    <div className="glass-effect py-6 px-6 rounded-[20px] flex flex-col gap-8">
                        {posts.map(post => (
                            <PostEntity
                                setPosts={setPosts}
                                post={post}
                                key={`${post.id}-${post.created_at}`}
                            />
                        ))}

                        {/* Элемент, за которым следит хук */}
                        {page < lastPage && (
                            <div ref={observerTarget} className="h-10 w-full flex justify-center items-center">
                                {loading && <p>Загрузка...</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    )
}