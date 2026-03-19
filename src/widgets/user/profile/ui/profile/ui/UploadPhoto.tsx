import { ReactNode } from "react";
import { useModal } from "@/shared/lib/hooks/useModal";
import { Modal } from "@/shared/ui/Modals/Modal";
import { useImageSelection } from "@/shared/lib/hooks/useImageSelection";
import { ImageCropper } from "@/features/image-cropper/ImageCropper";

interface UploadPhotoProps {
    onSave?: (blob: Blob) => void | Promise<void>;
    children?: ReactNode;
    cropShape?: "rect" | "round";
    aspect?: number;
}

export default function UploadPhoto({
        onSave,
        children,
        cropShape = "round",
        aspect = 1
    }: UploadPhotoProps) {
    const { isOpen, open, close } = useModal();
    const { previewUrl, reset, inputProps } = useImageSelection(open);

    const handleClose = () => {
        reset();
        close();
    };

    const handleCropSave = async (blob: Blob) => {
        if (onSave) await onSave(blob);
        handleClose();
    };

    return (
        <>
            <div className="relative inline-block cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="universal-upload-input"
                    {...inputProps}
                />
                <label htmlFor="universal-upload-input" className="cursor-pointer">
                    {children}
                </label>
            </div>

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
        </>
    );
}