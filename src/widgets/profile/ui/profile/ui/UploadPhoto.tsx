import {Button} from "@mui/material";
import {ChangeEvent, useCallback, useContext, useRef, useState} from "react";
import {useModal} from "@/shared/lib/hooks/useModal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {$fetch} from "@/shared/api/fetch";
import {getCroppedImg} from "@/shared/lib/utils/cropUtil";
import {UserContext} from "@/entities/user";
import {Modal} from "@/shared/ui/Modals/Modal";
import CropImg from "@/widgets/profile/ui/profile/ui/CropImg";

export default function UploadPhoto() {

    const {close, open, isOpen} = useModal()

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [tempImage, setTempImage] = useState<string | null>(null);

    const {setUser} = useContext(UserContext)

    const form = useRef<HTMLFormElement>(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleClose = () => {
        setTempImage(null);
        setZoom(1);
        close();
    };

    async function handleSaveCroppedImage() {
        if (!tempImage || !croppedAreaPixels) return;

        try {

            const croppedImageBlob: any = await getCroppedImg(tempImage, croppedAreaPixels);

            // 2. Создаем FormData вручную (не из ref, так как там лежит оригинал)
            const formData = new FormData();
            // 'avatar' - имя поля, которое ждет бэкенд
            formData.append('avatar', croppedImageBlob, 'avatar.jpg');

            // 3. Отправляем
            const response = await $fetch("me/update", {
                method: 'PATCH',
                body: formData
            });

            const user_ = response?.json?.user

            if (user_) {
                setUser(user_)
            }

            handleClose()


        } catch (e) {
            console.error("Ошибка при кропе или отправке", e);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempImage(imageUrl);
            setZoom(1); // Сброс зума для новой картинки
            open();
        }
    };

    return (
        <>
            <Button className="!bg-brand !p-0 !min-w-0 !h-12 !w-12 !absolute !bottom-[-12px] !right-0 !cursor-pointer !rounded-full">

                <form ref={form} className="w-full h-full relative">

                    <input type="file" accept="image/*" className="hidden" name="" id="avatar" onChange={handleFileChange}/>

                    <label htmlFor="avatar" className="cursor-pointer w-full h-full flex justify-center items-center">
                        <AddAPhotoIcon className="text-white" fontSize={"small"} />
                    </label>

                </form>

            </Button>

            <Modal close={close} isOpen={isOpen}>
                <CropImg
                    crop={crop}
                    zoom={zoom}
                    tempImage={tempImage}
                    setCrop={setCrop}
                    onCropComplete={onCropComplete}
                    setZoom={setZoom}
                    handleClose={handleClose}
                    handleSaveCroppedImage={handleSaveCroppedImage}
                />
            </Modal>
        </>
    )
}