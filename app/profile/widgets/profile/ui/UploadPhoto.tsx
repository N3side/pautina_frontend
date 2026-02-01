import {Heading} from "@/shared/styles/typography/headings";
import Cropper from "react-easy-crop";
import {PautinaText} from "@/shared/styles/typography/text";
import {Button, Slider} from "@mui/material";
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {useModal} from "@/shared/components/Modals/Modal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {$fetch} from "@/shared/api/fetch";
import {getCroppedImg} from "@/shared/utils/cropUtil";
import { ZoomIn, ZoomOut } from "@mui/icons-material"; // Импортируем иконки для зума

export default function UploadPhoto() {

    // Стейты для кроппера
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [tempImage, setTempImage] = useState<string | null>(null);

    const form = useRef<HTMLFormElement>(null);

    // Сохраняем координаты обрезки при каждом движении
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Очистка при закрытии
    const handleClose = () => {
        setTempImage(null);
        setZoom(1);
        close();
    };

    // --- ЛОГИКА СОХРАНЕНИЯ ---
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

// ... остальные импорты

// Внутри компонента:

    const { modal, open, close, isOpen } = useModal({
        children: (
            <div className="flex flex-col h-full w-full bg-surface">
                {/* --- 1. HEADER --- */}
                <div className="flex-none px-6 pt-6 pb-4 md:pt-8 md:px-8 border-b border-border-default/40">
                    <Heading variant="h5" className="font-bold text-text-main">
                        Настройка фото
                    </Heading>
                    <PautinaText variant="secondary" className="text-text-muted mt-1">
                        Выберите область для аватара
                    </PautinaText>
                </div>

                {/* --- 2. CROPPER AREA --- */}
                {/* FIX:
                    h-[50vh] (или 400px) — задает явную высоту на мобилке, чтобы кроппер появился.
                    md:h-auto md:flex-grow — на десктопе возвращаем старое поведение (заполнять пустоту),
                    так как там у модалки есть фиксированная высота.
                */}
                <div className="relative w-full h-[50vh] md:h-auto md:flex-grow bg-[#1a1a1a] overflow-hidden">
                    <Cropper
                        image={tempImage || ""}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        classes={{
                            containerClassName: "absolute inset-0",
                            mediaClassName: "",
                            // Добавил touch-action-none, чтобы свайп по картинке не скроллил саму модалку
                            cropAreaClassName: "!border-2 !border-brand/50 !shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] touch-none"
                        }}
                    />
                </div>

                {/* --- 3. CONTROLS FOOTER --- */}
                <div className="flex-none p-6 md:p-8 space-y-6 bg-surface z-10">

                    {/* Zoom Control */}
                    <div className="flex items-center gap-4">
                        <ZoomOut className="text-text-muted/50" fontSize="small" />
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(e, z) => setZoom(z as number)}
                            className="!text-brand"
                            // Кастомизация MUI слайдера для большей эстетики
                            sx={{
                                height: 6,
                                '& .MuiSlider-thumb': {
                                    width: 20,
                                    height: 20,
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                },
                                '& .MuiSlider-rail': {
                                    opacity: 0.2,
                                    backgroundColor: 'var(--text-muted)' // или твой цвет
                                }
                            }}
                        />
                        <ZoomIn className="text-text-muted/50" fontSize="small" />
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={handleClose}
                            variant="text"
                            className="!h-12 !rounded-xl !text-text-muted !font-semibold hover:!bg-text-main/5"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSaveCroppedImage}
                            variant="contained"
                            disableElevation
                            className="!h-12 !rounded-xl !bg-brand hover:!bg-brand-hover !text-white !font-bold !shadow-brand/20 !shadow-lg"
                        >
                            Применить
                        </Button>
                    </div>
                </div>
            </div>
        ),
        onClose: () => {
            setTempImage(null);
            setZoom(1);
        }
    })

    return (
        <>
            <Button className="!bg-brand !p-0 !min-w-0 !h-12 !w-12 !absolute !bottom-[-12px] !right-0 !cursor-pointer !rounded-full">

                <form ref={form} className="w-full h-full relative">

                    <input type="file" className="hidden" name="" id="avatar" onChange={handleFileChange}/>

                    <label htmlFor="avatar" className="cursor-pointer w-full h-full flex justify-center items-center">
                        <AddAPhotoIcon className="text-white" fontSize={"small"} />
                    </label>

                </form>

            </Button>

            {modal}
        </>
    )
}