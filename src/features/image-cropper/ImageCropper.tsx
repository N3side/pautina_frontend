import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/shared/lib/utils/cropUtil";
import {Slider} from "@mui/material";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";

interface ImageCropperProps {
    imageUrl: string;
    cropShape?: "rect" | "round";
    aspect?: number;
    onCropSave: (croppedBlob: Blob) => void;
    onCancel: () => void;
}

export function ImageCropper({
     imageUrl,
     cropShape = "round",
     aspect = 1,
     onCropSave,
     onCancel
 }: ImageCropperProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
        if (croppedBlob) onCropSave(croppedBlob);
    };

    return (
        <div className="relative w-full h-full min-h-[400px] flex flex-col gap-4">
            {/* Сама зона кропа */}
            <div className="relative flex-grow">
                <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    cropShape={cropShape}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </div>

            <Slider
                className="mt-5"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(_, value) => setZoom(Number(value))}
                sx={{
                    color: "var(--brand-primary)",
                    "& .MuiSlider-thumb": {
                        backgroundColor: "var(--brand-primary)",
                    },
                }}
            />

            {/* Кнопки управления */}
            <div className="flex justify-end gap-2">
                <ActionButton text="отмена" onClick={onCancel} />
                <BrandActionButton onClick={handleSave}>Загрузить фото</BrandActionButton>
            </div>
        </div>
    );
}