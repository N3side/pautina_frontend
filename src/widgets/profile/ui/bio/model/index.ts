import Department from "@/shared/assets/images/vector/activity/Department"
import Organization from "@/shared/assets/images/vector/activity/Organization"
import Role from "@/shared/assets/images/vector/activity/Role"
import Phone from "@/shared/assets/images/vector/contacts/Phone"
import Tg from "@/shared/assets/images/vector/contacts/Tg"
import Link from "@/shared/assets/images/vector/contacts/Link"
import {ComponentType} from "react"
import {userLinkWithoutProtocol} from "@/shared/lib/utils/userLink";

export interface Elems {
    Icon: ComponentType;
    k: string;
    value?: string;
}

// Маппер для активности
export const getActivityElems = (data: any): Elems[] => [
    {
        Icon: Organization,
        k: "Работаю в",
        value: data?.contacts?.organization || "Не указано"
    },
    {
        Icon: Role,
        k: "Роль в организации",
        value: data?.contacts?.post || "Не указано"
    },
    {
        Icon: Department,
        k: "Обучаюсь в",
        value: data?.contacts?.department || "Не указано"
    },
]

// Маппер для контактов
export const getContactElems = (data: any): Elems[] => [
    {
        Icon: Phone,
        k: "Телефон",
        value: data?.contacts?.phone || "не указано"
    },
    {
        Icon: Tg,
        k: "Telegram",
        value: data?.contacts?.tg || "не указано"
    },
    {
        Icon: Link,
        k: "Ссылка на профиль",
        value: userLinkWithoutProtocol(data?.publication?.public_url)
    },
]