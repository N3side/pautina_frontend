import Department from "@/shared/vector/activity/Department"
import Organization from "@/shared/vector/activity/Organization"
import Role from "@/shared/vector/activity/Role";

import Phone from "@/shared/vector/contacts/Phone"
import Tg from "@/shared/vector/contacts/Tg"
import Link from "@/shared/vector/contacts/Link"

import {ComponentType} from "react";

export interface Elems {
    Icon: ComponentType<any>; // или ComponentType<{}>
    k: string;
    value?: string;
}

const activity: Elems[] = [
    {
        Icon: Organization,
        k: "Организация",
        value: "ГАПОУ «МЦК-КТИТС»"
    },
    {
        Icon: Role,
        k: "Роль",
        value: "Студент"
    },
    {
        Icon: Department,
        k: "Отдел",
        value: "Отдел информационных технологий"
    },
]

const contacts: Elems[] = [
    {
        Icon: Phone,
        k: "Телефон",
        value: "+7 (912) 345-67-89"
    },
    {
        Icon: Tg,
        k: "Telegram",
        value: "@ivanov_dev"
    },
    {
        Icon: Link,
        k: "Ссылка",
        value: "github.com/ivanov"
    },
]

export {activity, contacts}