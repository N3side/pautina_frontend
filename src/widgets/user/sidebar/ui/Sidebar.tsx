"use client"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Elem from "@/widgets/user/sidebar/ui/Elem";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import {useContext, useMemo} from "react";
import {UserContext} from "@/entities/user";
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import {usePathname} from "next/navigation";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import SubscriptionOffer from "@/widgets/user/subscription-offer/SubscriptionOffer";
import VerifiedIcon from '@mui/icons-material/Verified';

interface Props {
    className?: string
}

export default function Sidebar({className}: Props) {

    const {user} = useContext(UserContext)
    const pathname = usePathname() // например: "/" или "/settings"

    const {isOpen, close, open} = useModal()

    const elems = useMemo(() => [
        !user && {
            Icon: HomeOutlinedIcon,
            text: "Главная",
            link: homeLink, // например: "/"
            path: "/" // путь для сравнения
        },
        user && {
            Icon: PersonIcon,
            text: "Профиль",
            link: userLink(user?.main?.short_id), // полный URL с поддоменом
            path: "/" // профиль находится на корневом пути
        },
        {
            Icon: ForumIcon,
            text: "Лента",
            link: "/feed",
            path: "/feed",
        },
        user && {
            Icon: SettingsOutlinedIcon,
            text: "Настройки",
            link: "/edit?step=settings",
            path: "/edit"
        },
        {
            Icon: VerifiedIcon,
            text: "Подписка",
            link: "",
            path: "",
            customFunc: () => {
                open()
            }
        },
    ].filter(Boolean), [user]);

    return (
        <div
            className={`
                flex flex-col gap-2
                transition-all duration-300 ease-in-out
                glass-effect rounded-2xl
                min-w-[230px] w-full h-full
                ${className}
            `}
        >
            {elems?.map((elem, key) => {
                // Сравниваем путь, а не полный URL
                const currentPath = pathname.split('?')[0];
                const isActive = elem.path === currentPath;

                return (
                    <Elem
                        isActive={isActive}
                        Icon={elem.Icon}
                        text={elem.text}
                        href={elem.link}
                        key={key}
                        onClick={(e) => {
                            if (elem?.customFunc) {
                                e.preventDefault()
                                e.stopPropagation()
                                elem?.customFunc()
                            }
                        }}
                    />
                )
            })}

            <Modal isOpen={isOpen} close={close}>
                <SubscriptionOffer user={user} />
            </Modal>
        </div>
    )
}