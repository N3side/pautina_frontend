import UploadPhoto from "@/widgets/user/profile/ui/profile/ui/UploadPhoto";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BigAvatar from "@/shared/ui/user/avatar/BigAvatar";
import Input from "@/shared/ui/Inputs/Input"
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {useContext, useRef, useState} from "react";
import {autoReplace} from "@/shared/lib/utils/replace";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import Textarea from "@/shared/ui/Inputs/Textarea";
import {dots} from "@/shared/styles/patterns/dots";


export default function Profile({heading}) {

    const [errors, setErrors] = useState<Record<string, any> | null>(null)

    const {user, setUser} = useContext(UserContext)

    const form = useRef<HTMLFormElement>(null)

    async function handleSubmit(e) {

        e.preventDefault()

        const formData = new FormData(form.current || undefined)

        const response = await $fetch("me/update/user", {
            method: "PATCH",
            body: formData
        })

        const user_ = response?.json?.user

        if (user_) {
            setUser(user_)
        }
    }

    async function ChangeHeader(blob) {

        const formData = new FormData()
        formData.set("header", blob)

        const response = await $fetch("me/update/user", {
            method: "PATCH",
            body: formData
        })

        const user_ = response?.json?.user

        if (user_) {
            setUser(user_)
        }
    }

    return (
        <form className="flex flex-col gap-5 relative" onSubmit={handleSubmit} ref={form}>
            <div className="absolute w-full flex flex-col">
                <div className='glass-effect py-4 px-6 rounded-t-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>
                </div>
                <div className="relative h-[300px] w-full mt-0.1 glass-effect border-y-0"
                     style={{
                         backgroundImage: `url("${dots}")`,
                     }}
                >
                    {user?.main?.header &&
						<img src={user?.main?.header} alt="" className="w-full h-full object-cover"/>
                    }
                    <div className="!absolute !top-[20px] !right-[20px]">
                        <UploadPhoto
                            onSave={ChangeHeader}
                            cropShape="rect"
                            aspect={448 / 100}
                        >
                            <ActionButton text="загрузить шапку" Icon={EditOutlinedIcon} className="glass-effect !bg-surface"  />
                        </UploadPhoto>
                    </div>
                </div>
            </div>
            <div className="glass-effect z-[0] mt-[340px] rounded-[18px] px-6 py-8 gap-4 flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="shrink-0">
                        <BigAvatar avatar={user?.main?.avatar} />
                    </div>

                    <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2">
                        <Input label="имя" defaultValue={user?.main?.name} placeholder="Ваше имя" name="name" error={errors?.name} />
                        <Input label="фамилия" defaultValue={user?.main?.surname} placeholder="Ваша фамилия" name="surname" error={errors?.surname} />
                        <Input label="отчество" defaultValue={user?.main?.patronymic} placeholder="Ваше отчество" name="patronymic" error={errors?.patronymic} />
                    </div>
                </div>
            </div>
            <div className="glass-effect rounded-[18px] px-6 py-8 flex flex-col gap-4">
                <Input
                    name="username"
                    label="Юзернейм в системе"
                    defaultValue={user?.main?.username}
                    error={errors?.username}
                    leftAdditional="@"
                    onInput={autoReplace}
                />
                <Textarea
                    name="bio"
                    label="О себе"
                    defaultValue={user?.main?.bio}
                    error={errors?.bio}
                    maxLength={100}
                    inputClassName="!h-[80px] !min-h-[100px]"
                />

                <ButtonLarge type="submit" className="!text-white !font-bold !text-small">
                    Сохранить
                </ButtonLarge>

            </div>
        </form>
    )
}