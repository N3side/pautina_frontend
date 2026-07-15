"use client"

import {useIntersectionObserver} from "@/shared/lib/hooks/useIntersectionObserver";
import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect, useState} from "react";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import {usePathname, useRouter} from "next/navigation";
import PostWidget from "@/widgets/user/post-widget/PostWidget";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import Input from "@/shared/ui/Inputs/Input";
import SearchIcon from "@mui/icons-material/Search";
import SubscriptionSectionOffer from "@/widgets/user/subscription-offer/SubscriptionSectionOffer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import MakePostWidget from "@/widgets/user/make-post/MakePostWidget";
import {UserContext} from "@/entities/user";

export default function Page() {

    const id = usePathname().split("/").pop()

    const { page, setPage, lastPage, setLastPage } = UsePaginate();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const observerTarget = useIntersectionObserver(
        () => {
            if (!loading && page < lastPage) {
                setPage(prev => prev + 1);
            }
        },
        page < lastPage
    );

    async function getPosts(user_id: string, pageNumber: number) {
        setLoading(true);
        const response = await $fetch(`posts/user/${user_id}?page=${pageNumber}`);
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
        if (id) getPosts(id, page);
    }, [page]);

    const router = useRouter()

    const {user} = useContext(UserContext)

    const isMyProfile = id === user?.main?.id

    return (
        <Layout rightChildren={
            <div className="flex flex-col gap-3 w-full max-w-[350px] h-fit">
                <Input className="w-full" inputClassName="!rounded-3xl" placeholder="Поиск" leftAdditional={<SearchIcon />} />
                <SubscriptionSectionOffer />
            </div>
        }>
            {posts && Array?.isArray(posts) && posts?.length > 0 &&
                <div className="lg:w-[650px] w-full flex flex-col gap-4">
                    <ActionButton className="gap-2 !px-4 w-fit" onClick={() => router.back()}>
                        <KeyboardBackspaceIcon className="text-text-muted" />
                        <p className="text-text-muted font-semibold text-small">
                            Вернуться назад
                        </p>
                    </ActionButton>
                    {
                        isMyProfile &&
                        <div className="glass-effect p-4 rounded-2xl">
                            <MakePostWidget />
                        </div>
                    }
                    <div className="flex flex-col gap-4 w-full glass-effect p-6 rounded-2xl">
                        {posts?.map(post =>
                            <PostWidget
                                key={post?.id}
                                post={post}
                                galleryClassName="!max-w-full !max-h-[450px] h-full !w-full !overflow-hidden"
                                setPosts={setPosts}
                            />
                        )}

                        {page < lastPage && (
                            <div ref={observerTarget} className="h-10 w-full flex justify-center items-center">
                                {loading && <p>Загрузка...</p>}
                            </div>
                        )}
                    </div>
                </div>
            }
        </Layout>
    )
}