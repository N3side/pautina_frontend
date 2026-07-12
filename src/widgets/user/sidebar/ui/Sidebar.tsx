"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";

import Elem from "@/widgets/user/sidebar/ui/Elem";
import { homeLink, userLink } from "@/shared/lib/utils/userLink";
import { UserContext } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks/useModal";
import { Modal } from "@/shared/ui/Modals/Modal";
import SubscriptionOffer from "@/widgets/user/subscription-offer/SubscriptionOffer";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

interface Props {
    className?: string;
}

const ROOT_DOMAINS = [
    "pautina.test",
    "www.pautina.test",
];

export default function Sidebar({ className }: Props) {
    const { user } = useContext(UserContext);
    const pathname = usePathname();
    const { isOpen, close, open } = useModal();

    const [isProfileDomain, setIsProfileDomain] = useState<boolean | null>(null);

    useEffect(() => {
        setIsProfileDomain(
            !ROOT_DOMAINS.includes(window.location.host)
        );
    }, []);

    const elems = useMemo(
        () =>
            [
                {
                    id: "about",
                    Icon: HomeOutlinedIcon,
                    text: "О нас",
                    link: "/about",
                },
                {
                    id: "feed",
                    Icon: ForumIcon,
                    text: "Лента",
                    link: homeLink,
                },
                user && {
                    id: "profile",
                    Icon: PersonIcon,
                    text: "Профиль",
                    link: userLink(user.main.short_id),
                },
                user?.access?.role === "company" && {
                    id: "company",
                    Icon: BusinessCenterIcon,
                    text: "Мероприятия",
                    link: `/company/${user?.main?.id}`
                },
                user && {
                    id: "settings",
                    Icon: SettingsOutlinedIcon,
                    text: "Настройки",
                    link: "/edit?step=settings",
                },
                {
                    id: "subscription",
                    Icon: VerifiedIcon,
                    text: "Подписка",
                    link: "#",
                    customFunc: open,
                },
            ].filter(Boolean),
        [user, open]
    );

    // Пока не определили домен — ничего не рисуем
    if (isProfileDomain === null) {
        return null;
    }

    return (
        <>
            <div
                className={`
                    flex flex-col gap-2
                    transition-all duration-300 ease-in-out
                    glass-effect rounded-2xl
                    w-full h-full min-w-[190px]
                    ${className}
                `}
            >
                {elems.map((elem: any) => {
                    let isActive = false;

                    switch (elem.id) {
                        case "about":
                            isActive = pathname.startsWith("/about");
                            break;

                        case "feed":
                            isActive =
                                !isProfileDomain &&
                                pathname === "/";
                            break;

                        case "profile":
                            isActive = isProfileDomain;
                            break;

                        case "settings":
                            isActive = pathname.startsWith("/edit");
                            break;

                        default:
                            isActive = false;
                    }

                    return (
                        <Elem
                            key={elem.id}
                            href={elem.link}
                            Icon={elem.Icon}
                            text={elem.text}
                            isActive={isActive}
                            onClick={(e) => {
                                if (elem.customFunc) {
                                    e.preventDefault();
                                    elem.customFunc();
                                }
                            }}
                        />
                    );
                })}
            </div>

            <Modal isOpen={isOpen} close={close}>
                <SubscriptionOffer user={user} />
            </Modal>
        </>
    );
}