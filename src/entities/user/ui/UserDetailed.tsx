import IconKeyValue from "@/shared/ui/icon-text/IconKeyValue";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SchoolIcon from "@mui/icons-material/School";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkIcon from '@mui/icons-material/Link';
import {userLinkWithoutProtocol} from "@/shared/lib/utils/userLink";
import VkIcon from "@/shared/assets/images/vector/vk/VkIcon";
import LanguageIcon from '@mui/icons-material/Language';
import {GitHub} from "@mui/icons-material";

interface Props {
    user: Record<string, any>
    isPrivate: boolean
}

export default function UserDetailed({user, isPrivate}: Props) {

    const main = [
        {
            k: "Юзернейм",
            v: user?.main?.username,
            Icon: AlternateEmailIcon
        },
        !isPrivate && {
            k: "Город",
            v: user?.contacts?.translated_city,
            Icon: PlaceOutlinedIcon
        },
        !isPrivate && !["undefined", "null"].includes(user?.contacts?.status) && {
            k: "Чем занимаюсь",
            v: user?.contacts?.status,
            Icon: LightbulbOutlinedIcon
        },
    ]

    const job = [
        {
            k: "Место работы",
            v: user?.contacts?.organization,
            Icon: BusinessCenterOutlinedIcon
        },
        {
            k: "Должность",
            v: user?.contacts?.post,
            Icon: PersonOutlineOutlinedIcon
        },
    ]

    const student = [
        {
            k: "Место учёбы",
            v: user?.contacts?.department,
            Icon: SchoolIcon
        },
        {
            k: "Курс/класс",
            v: user?.contacts?.course,
            Icon: NumbersOutlinedIcon
        },
    ]

    const contacts = [
        {
            k: "Вконтакте",
            v: user?.contacts?.vk,
            Icon: VkIcon,
            link: `https://vk.com/${user?.contacts?.vk}`
        },
        {
            k: "Телеграмм",
            v: user?.contacts?.tg,
            Icon: TelegramIcon,
            link: `https://t.me/${user?.contacts?.tg}`
        },
        {
            k: "Гитхаб",
            v: user?.contacts?.github,
            Icon: GitHub,
            link: `https://github.com/${user?.contacts?.github}`
        },
        {
            k: "Сайт",
            v: user?.contacts?.extra_link,
            Icon: LanguageIcon,
            link: `https://${user?.contacts?.extra_link}`
        },
        {
            k: "Ссылка на профиль",
            v: userLinkWithoutProtocol(user?.main?.short_id),
            Icon: LinkIcon,
            shouldCopy: true
        }
    ]

    const parts: any = [
        {
            name: null,
            arr: main
        },
        !isPrivate && {
            name: "Работа",
            arr: job
        },
        !isPrivate && {
            name: "Обучение",
            arr: student
        },
        !isPrivate && {
            name: "Контакты",
            arr: contacts
        },
    ]

    return (
        <div className="flex flex-col divide-y divide-[var(--border-default)]">
            <div className="pb-6">
                <p className="text-large text-text-muted font-bold">
                    Подробная информация
                </p>
            </div>
            {parts?.map((part, key) =>
                part?.arr?.filter(elem => elem?.v).length > 0 &&
                <div key={key} className="py-6 flex flex-col gap-5">
                    {
                        part?.name &&
						<p className="text-default text-text-muted font-bold">{part?.name}</p>
                    }
                    <div className="flex flex-col gap-4">
                        {part?.arr?.map((elem, elemKey) =>
                            elem?.v &&
                            <IconKeyValue
                                key={elemKey}
                                link={elem?.link}
                                Icon={elem?.Icon}
                                k={elem?.k}
                                v={elem?.v}
                                shouldCopy={elem?.shouldCopy}
                            />
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}
