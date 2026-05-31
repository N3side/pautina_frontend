import IconText from "@/shared/ui/icon-text/IconText";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Capitalize} from "@/shared/lib/utils/capitalize";
import SchoolIcon from '@mui/icons-material/School';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import {WheelXScrollProvider} from "@/shared/ui/WheelScrollXWrapper/WheelScrollXWrapper";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import UserDetailed from "../ui/UserDetailed";
import BigAvatar from "@/shared/ui/user/avatar/BigAvatar";
import VkIcon from "@/shared/assets/images/vector/vk/VkIcon";
import LanguageIcon from "@mui/icons-material/Language";
import SubscriptionIcon from "@/shared/ui/user/subscription/SubscriptionIcon";
import SubscriptionOffer from "../../../widgets/user/subscription-offer/SubscriptionOffer";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import toast from "react-hot-toast";
import {useContext} from "react";
import {UserContext} from "..";
import TelegramIcon from "@mui/icons-material/Telegram";

interface Props {
    user: Record<string, any>
    isMyProfile: boolean
    isPrivate: boolean
    showModals?: boolean
    isPremium?: boolean
}

export default function User({user, isMyProfile, isPrivate, showModals, isPremium=false}: Props) {

    const fullName = [user?.main?.surname, user?.main?.name].map(_ => Capitalize(_)).join(" ")

    const parts = [
        {
            text: user?.contacts?.translated_city,
            Icon: PlaceOutlinedIcon
        },
        !["undefined", "null"].includes(user?.contacts?.status) && {
            text: user?.contacts?.status,
            Icon: LightbulbOutlinedIcon
        },
        {
            text: user?.contacts?.department,
            Icon: SchoolIcon
        },
        {
            text: user?.contacts?.course,
            Icon: NumbersOutlinedIcon
        },
        {
            text: user?.contacts?.organization,
            Icon: BusinessCenterOutlinedIcon
        },
        {
            text: user?.contacts?.post,
            Icon: PersonOutlineOutlinedIcon
        },
        {
            text: user?.contacts?.tg,
            Icon: TelegramIcon,
            link: `https://t.me/${user?.contacts?.tg}`
        },
        {
            text: user?.contacts?.vk,
            Icon: VkIcon,
            link: `https://vk.com/${user?.contacts?.vk}`
        },
        {
            text: user?.contacts?.extra_link,
            Icon: LanguageIcon,
            link: `https://${user?.contacts?.extra_link}`
        },
    ]

    const {isOpen, open, close} = useModal()

    const {isOpen: isOpenSub, open: openSub, close: closeSub} = useModal()

    const {user: authUser} = useContext(UserContext)

    return (
        <div className="flex gap-5 items-center flex-col lg:flex-row">
            <BigAvatar className="w-[160px] h-[160px] !absolute !top-[-80px] glass-effect" isMyProfile={isMyProfile} avatar={user?.main?.avatar} />
            <div className="w-[160px] h-[70px]"></div>
            <div className="relative flex flex-col gap-2 items-center lg:items-start">
                <div className="flex gap-1 items-center">

                    <h5
                        className={`
                            ${(isPremium || HasUserSubscription({user})) ? "bg-[image:var(--subscription-color)] bg-clip-text text-transparent" : "text-text-main"}  font-bold text-xl
                        `}
                        style={{ WebkitBackgroundClip: 'text' }}
                    >
                        {fullName}
                    </h5>


                    {
                        (HasUserSubscription({user}) || isPremium) &&
                        <div className="cursor-pointer" onClick={() =>
                            !HasUserSubscription({user: authUser}) ?
                            openSub() : toast.success("Кастомизация иконок в разработке")
                        }>
                            <SubscriptionIcon />
                        </div>
                    }

                </div>

                {
                    showModals &&
                    <Modal isOpen={isOpenSub} close={closeSub} modalClassName="max-w-[1000px]">
                        <SubscriptionOffer user={user} />
                    </Modal>
                }



                {/*<p className="text-text-main text-small font-semibold">Был в сети:</p>*/}
                <WheelXScrollProvider className="justify-start !max-w-[340px] gap-4 !mt-0 max-[400px]:!max-w-[250px]">
                    <IconText
                        className="cursor-pointer"
                        Icon={InfoOutlinedIcon}
                        text="Подробнее"
                        onClick={open}
                    />
                    {parts?.map((part: any, i) =>
                        part?.text &&
						<IconText
							key={i}
							Icon={part?.Icon}
							text={part?.text}
                            link={part?.link}
						/>
                    )}
                </WheelXScrollProvider>
                {
                    showModals &&
                    <Modal
                        isOpen={isOpen}
                        close={close}
                    >
                        <UserDetailed isPrivate={isPrivate} user={user} />
                    </Modal>
                }

            </div>
        </div>
    )
}