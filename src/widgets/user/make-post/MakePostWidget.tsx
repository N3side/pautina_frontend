"use client"

import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import {useContext, useState} from "react";
import {UserContext} from "@/entities/user";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import EditGallery from "@/features/edit-gallery/EditGallery";
import {$fetch} from "@/shared/api/fetch";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import EmojiDropdown from "@/features/select-emoji/EmojiDropdown";
import AdjustableText from "@/shared/ui/adjustable-text/AdjustableText";

interface Props {
    className?: string
    setPosts?: (any) => any
}

export default function MakePostWidget({ setPosts, className }: Props) {

    const {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles, // Достаем функцию догрузки
        gallery,
        setGallery
    } = useGalleryLogic({
        entity: "posts",
        isClientOnly: true
    });

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState<string>("")

    async function getPost(post_id: string) {
        const response = await $fetch(`posts/${post_id}`)

        return response
    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        // 1. Создаем сначала сам пустой пост
        const postResponse = await $fetch("posts", {
            method: "POST",
            body: JSON.stringify({title}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        const newPostId = postResponse?.json?.post_id;

        if (newPostId) {
            setTitle("")
            await uploadAllPendingFiles(newPostId);

            if (setPosts) {
                const response = await getPost(newPostId)

                const post_ = response?.json?.post
                if (post_) {
                    const newPost = { ...post_ };
                    setPosts(prev => ([newPost, ...prev]))
                }
            }

            await setGallery([])
        }
    }

    return (
        <form className={`flex gap-3 pb-4 h-full ${className}`} onSubmit={handleSubmit}>
            {/* Наш скрытый инпут, который слушает клик по иконке */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*, video/*"
                className="hidden"
            />

            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface">
                <img src={user?.main?.avatar} className="w-full h-full object-cover" alt="Avatar"/>
            </div>

            <div className="flex flex-col w-full gap-4">
                {/*<textarea*/}
                {/*    value={title}*/}
                {/*    className="max-w-full bg-transparent outline-none text-xl placeholder:text-text-muted/60 min-h-[60px] w-full resize-none overflow-hidden text-text-main"*/}
                {/*    placeholder="Напишите, о чем думаете"*/}
                {/*    rows={1}*/}
                {/*    name="title"*/}
                {/*    onInput={(e) => {*/}
                {/*        e.currentTarget.style.height = 'auto';*/}
                {/*        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';*/}
                {/*        setTitle(e?.target?.value || "")*/}
                {/*    }}*/}
                {/*/>*/}

                <AdjustableText text={title} setText={setTitle} wrapperClassName="min-h-[60px] text-large" placeholder="Напишите, о чем думаете" />

                {/* Показываем галерею для сортировки только если там есть элементы */}
                {gallery && gallery.length > 0 && (
                    <EditGallery
                        cards={gallery}
                        setCards={setGallery}
                        onDelete={handleDelete}
                        isClientOnly={true}
                    />
                )}

                <div className="flex justify-between items-start">
                    <div className="flex gap-1 text-brand">
                        <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} btnHeight={40} btnWidth={40} />

                        <EmojiDropdown trigger={
                            <RoundedIconWrapper Icon={SentimentSatisfiedOutlinedIcon} btnHeight={40} btnWidth={40} />
                        } text={title} setText={setTitle} />

                    </div>

                    <BrandActionButton className="!rounded-4xl" type="submit">
                        Опубликовать
                    </BrandActionButton>
                </div>
            </div>
        </form>
    )
}