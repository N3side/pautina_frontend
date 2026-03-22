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
import UserDetailed from "@/entities/user/ui/UserDetailed";
import BigAvatar from "@/shared/ui/user/avatar/BigAvatar";

interface Props {
    user: Record<string, any>
    isMyProfile: boolean
    isPrivate: boolean
}

export default function User({user, isMyProfile, isPrivate}: Props) {

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
    ]

    const {isOpen, open, close} = useModal()

    return (
        <div className="flex gap-5 items-center flex-col lg:flex-row">
            <BigAvatar className="w-[160px] h-[160px] !absolute !top-[-80px] glass-effect" isMyProfile={isMyProfile} avatar={user?.main?.avatar} />
            <div className="w-[160px] h-[70px]"></div>
            <div className="relative flex flex-col gap-2 items-center lg:items-start">
                <h5 className="text-text-main font-bold">{fullName}</h5>
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
						/>
                    )}
                </WheelXScrollProvider>
                <Modal
                    isOpen={isOpen}
                    close={close}
                >
                    <UserDetailed isPrivate={isPrivate} user={user} />
                </Modal >
            </div>
        </div>
    )
}