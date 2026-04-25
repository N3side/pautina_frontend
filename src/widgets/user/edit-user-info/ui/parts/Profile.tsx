import UploadPhoto from "@/widgets/user/profile/ui/profile/ui/UploadPhoto";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BigAvatar from "@/shared/ui/user/avatar/BigAvatar";
import Input from "@/shared/ui/Inputs/Input"
import {useHandleSubmit} from "@/widgets/user/edit-user-info/api/useHandleSubmit";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {useContext, useRef} from "react";
import {autoReplace} from "@/shared/lib/utils/replace";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";


export default function Profile({heading}) {

    const form_ = useRef(null)

    const {user, isLoading, setUser} = useContext(UserContext)

    const {errors, handleSubmit} = useHandleSubmit({
        form_,
    })

    async function ChangeHeader(blob) {

        const formData = new FormData()
        formData.set("header", blob)

        const response = await $fetch("me/update", {
            method: "PATCH",
            body: formData
        })

        const user_ = response?.json?.user

        if (user_) {
            setUser(user_)
        }
    }

    return (
        <form className="flex flex-col gap-5 relative" onSubmit={handleSubmit} ref={form_}>
            <div className="absolute w-full flex flex-col">
                <div className='glass-effect py-4 px-6 rounded-t-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>
                </div>
                <div className="relative h-[300px] w-full mt-0.1 glass-effect border-y-0"
                     style={{
                         backgroundImage: `url(${!user?.main?.header && "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E"})`,
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
                            <ActionButton component="div" text="загрузить шапку" Icon={EditOutlinedIcon} className="!bg-input"  />
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
                <Input
                    name="bio"
                    label="О себе"
                    defaultValue={user?.main?.bio}
                    error={errors?.bio}
                />

                <ButtonLarge type="submit" className="!text-white !font-bold !text-small">
                    Сохранить
                </ButtonLarge>

            </div>
        </form>
    )
}