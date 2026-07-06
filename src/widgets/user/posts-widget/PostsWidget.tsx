import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import PostWidget from "@/widgets/user/post-widget/PostWidget";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import Link from "next/link";

interface Props {
    isMyProfile: boolean,
    trueUser: Record<string, any> | null
    setIsEmpty: (isEmpty: boolean) => void
}

export default function PostsWidget({isMyProfile, trueUser, setIsEmpty}: Props) {

    const [posts, setPosts] = useState<Record<string, any>[] | null>(null)
    const {page, setPage, lastPage, setLastPage, perPage, setPerPage} = UsePaginate()

    async function getPosts(user_id: string | number) {
        const response = await $fetch(`posts/user/${user_id}`)

        const posts_ = response?.json?.posts
        const last_page = response?.json?.last_page

        if (posts_) {
            setPosts(posts_)
        }
        if (last_page) {
            setLastPage(last_page)
        }
    }

    useEffect(() => {
        if (trueUser?.main?.id)
            getPosts(trueUser?.main?.id)
    }, []);

    return (
        <div className="glass-effect rounded-2xl p-6 flex flex-col gap-4 w-full">
            <h6 className="text-text-main font-bold tracking-tight">
                Посты
            </h6>

            {posts && Array?.isArray(posts) && posts?.length > 0 &&
                <div className="flex flex-col gap-4 w-full overflow-hidden relative">
                    {posts?.map((post, i) =>
                        <div
                            key={post?.id}
                            className={i === 2 ? "relative select-none pointer-events-none" : ""}
                        >
                            {/* Сам пост */}
                            <div
                                style={{
                                    // Плавное исчезновение прозрачности самого поста к низу (чтобы кнопка смотрелась органично)
                                    maskImage: i === 2 ? 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)' : undefined,
                                    WebkitMaskImage: i === 2 ? 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)' : undefined,
                                }}
                            >
                                <PostWidget
                                    post={post}
                                    galleryClassName="!max-w-full !max-h-[450px] h-full !w-full !overflow-hidden"
                                    setPosts={setPosts}
                                />
                            </div>

                            {/* Слой с ГРАДИЕНТНЫМ БЛЮРОМ (без цвета) */}
                            {i === 2 && (
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-b-2xl z-10"
                                    style={{
                                        // Применяем блюр к фону (то есть к посту под этим слоем)
                                        backdropFilter: 'blur(6px)',
                                        WebkitBackdropFilter: 'blur(6px)',
                                        // Маска скрывает блюр сверху (transparent) и плавно проявляет его к низу (black)
                                        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, black 85%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, black 85%)',
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {lastPage > 1 && (
                        <div className="relative -mt-20 z-20 flex justify-center">
                            <Link href={`/user/posts/${trueUser?.main?.id}`}>
                                <ActionButton className="text-small font-medium">
                                    Смотреть все посты
                                </ActionButton>
                            </Link>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}