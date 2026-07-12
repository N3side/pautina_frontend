import SocialButton from "@/shared/ui/SocialButton/SocialButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {HeartFilledIcon} from "@/shared/assets/images/vector/logo/HeartIcon";
import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";

interface Props {
    is_liked: boolean
    likes_count: number
    entity: string
    entity_id: string
    showLikes: boolean
}

export default function Like({is_liked, likes_count, entity, entity_id, showLikes}: Props) {

    const [isLiked, setIsLiked] = useState<boolean>(!!is_liked)
    const [likesCount, setLikesCount] = useState<number>(likes_count || 0)

    useEffect(() => {
        setIsLiked(!!is_liked);
        setLikesCount(likes_count || 0);
    }, [is_liked, likes_count]);

    async function handleLike(e: React.MouseEvent) {
        e.stopPropagation()

        const response = await $fetch("like", {
            method: "POST",
            body: JSON.stringify({
                "entity": entity,
                "entity_id": entity_id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        if (response?.response?.ok) {
            setIsLiked((prev) => {
                const newLiked = !prev;
                setLikesCount((count) => newLiked ? count + 1 : Math.max(0, count - 1));
                return newLiked;
            })
        }
    }

    async function removeLike(e: React.MouseEvent) {
        e.stopPropagation()

        const response = await $fetch("unlike", {
            method: "POST",
            body: JSON.stringify({
                "entity": entity,
                "entity_id": entity_id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        if (response?.response?.ok) {
            setIsLiked((prev) => {
                const newLiked = !prev;
                setLikesCount((count) => newLiked ? count - 1 : Math.max(0, count - 1));
                return newLiked;
            })
        }
    }

    return (
        <SocialButton
            showCount={showLikes}
            count={likesCount}
            Icon={FavoriteBorderOutlinedIcon}
            ActiveIcon={HeartFilledIcon}
            active={isLiked}
            onClick={(e) => !isLiked ? handleLike(e) : removeLike(e)}
        />
    )
}