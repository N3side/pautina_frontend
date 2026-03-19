import {HTMLAttributes, useContext} from "react";
import UploadPhoto from "@/widgets/user/profile/ui/profile/ui/UploadPhoto";
import {$fetch} from "@/shared/api/fetch";
import {UserContext} from "@/entities/user";
import {Button} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string
    avatar: string
    isMyProfile?: boolean
}

export default function BigAvatar({
    avatar,
    className,
    isMyProfile = true,
    ...props
  }: Props) {

    const {setUser} = useContext(UserContext)

    async function changeAvatar(blob) {
        const formData = new FormData()
        formData.set("avatar", blob)

        const response = await $fetch("me/update", {
            method: "PATCH",
            body: formData
        })

        const user = response?.json?.user
        if (user) {
            setUser(user)
        }
    }

    return (
        <div className={`relative w-[120px] h-[120px] rounded-full p-1 ${className}`} {...props}>
            <img
                src={avatar}
                alt="avatar"
                className="!w-full !h-full rounded-full object-cover shadow-sm"
                referrerPolicy="no-referrer"
            />

            {isMyProfile && (
                <div className="absolute bottom-1 right-1">
                    <UploadPhoto onSave={changeAvatar} aspect={1} cropShape="round">
                        <Button component="div" className="!rounded-full !w-[60px] !h-[30px] !bg-brand">
                            <AddAPhotoIcon sx={{fontSize: "16px"}} className="text-white" />
                        </Button>
                    </UploadPhoto>
                </div>
            )}
        </div>
    );
}