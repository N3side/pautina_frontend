import { ReactNode, useId, useRef } from "react";
import { useModal } from "@/shared/lib/hooks/useModal";
import { Modal } from "@/shared/ui/Modals/Modal";
import { useImageSelection } from "@/shared/lib/hooks/useImageSelection";
import { ImageCropper } from "@/features/image-cropper/ImageCropper";

interface UploadPhotoProps {
    onSave?: (blob: Blob) => void | Promise<void>;
    onSelect?: (file: File) => void;
    children?: ReactNode;
    cropShape?: "rect" | "round";
    aspect?: number;
    mode?: "simple" | "crop";
}

export default function UploadPhoto({
                                        onSave,
                                        onSelect,
                                        children,
                                        cropShape = "round",
                                        aspect = 1,
                                        mode = "crop"
                                    }: UploadPhotoProps) {
    const { isOpen, open, close } = useModal();
    const { previewUrl, reset, inputProps } = useImageSelection(open);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    const handleClose = () => {
        reset();
        close();
    };

    const handleCropSave = async (blob: Blob) => {
        if (onSave) await onSave(blob);
        handleClose();
    };

    const handleSimpleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (onSelect) {
            onSelect(file);
        } else if (onSave) {
            const blob = new Blob([file], { type: file.type });
            onSave(blob);
        }
        e.target.value = '';
    };

    return (
        <>
            <div className="relative inline-block">
                {/* Input прозрачный и поверх кнопки */}
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    id={`upload-input-${id}`}
                    {...(mode === "crop" ? inputProps : {})}
                    onChange={mode === "simple" ? handleSimpleFileSelect : inputProps.onChange}
                    onClick={(e) => {
                        (e.target as HTMLInputElement).value = '';
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Дочерние элементы - игнорируем pointer events чтобы курсор был от input */}
                <div className="pointer-events-none">
                    {children}
                </div>
            </div>

            {mode === "crop" && (
                <Modal close={handleClose} isOpen={isOpen}>
                    {previewUrl && (
                        <ImageCropper
                            imageUrl={previewUrl}
                            onCropSave={handleCropSave}
                            onCancel={handleClose}
                            cropShape={cropShape}
                            aspect={aspect}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}