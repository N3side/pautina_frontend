import Cropper from "react-easy-crop";
import {ZoomIn, ZoomOut} from "@mui/icons-material";
import {Button, Slider} from "@mui/material";

export default function CropImg({crop, zoom, tempImage, setCrop, onCropComplete, setZoom, handleClose, handleSaveCroppedImage}) {

    // onClose: () => {
    //     setTempImage(null);
    //     setZoom(1);
    // }

    return (
        <div className="flex flex-col h-full w-full glass-effect rounded-xl">
            {/* --- 1. HEADER --- */}
            <div className="flex-none px-6 pt-6 pb-4 md:pt-8 md:px-8 border-b border-border-default/40">
                <h5 className="font-bold text-text-main">
                    Настройка фото
                </h5>
                <p className="text-secondary text-text-muted mt-1">
                    Выберите область для аватара
                </p>
            </div>

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
            <div className="flex-none p-6 md:p-8 space-y-6 z-10">

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
    )

}