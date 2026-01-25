import Department from "@/shared/vector/activity/Department"
import Organization from "@/shared/vector/activity/Organization"
import Role from "@/shared/vector/activity/Role"
import Phone from "@/shared/vector/contacts/Phone"
import Tg from "@/shared/vector/contacts/Tg"
import Link from "@/shared/vector/contacts/Link"
import { ComponentType } from "react"

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
        value: data?.organization || "Не указано"
    },
    {
        Icon: Role,
        k: "Роль в организации",
        value: data?.role || "Не указано"
    },
    {
        Icon: Department,
        k: "Обучаюсь в",
        value: data?.department || "Не указано"
    },
]

// Маппер для контактов
export const getContactElems = (data: any): Elems[] => [
    {
        Icon: Phone,
        k: "Телефон",
        value: data?.phone || "не указано"
    },
    {
        Icon: Tg,
        k: "Telegram",
        value: data?.tg || "не указано"
    },
    {
        Icon: Link,
        k: "Ссылка",
        value: data?.website || "не указано"
    },
]