import CloseIcon from '@mui/icons-material/Close';
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { useRef } from 'react';
import { $fetch } from "@/shared/api/fetch";
import { usePathname } from "next/navigation";

interface Props {
    image?: Record<string, any>;
    isAddImage?: boolean;
    onUploadSuccess?: (newCardData: any) => void;
    onRemove?: () => void;
}

export default function GalleryCard({
        image,
        isAddImage = false,
        onUploadSuccess,
        onRemove
    }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const id = usePathname().split("/").pop();

    const handleTriggerSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.set("image", file);

        const response = await $fetch(`posts/${id}/gallery/load`, {
            method: "PATCH",
            body: formData
        });

        // Забираем JSON новой карточки (подстрой под формат своего $fetch, обычно это response?.json)
        const responseData = response?.json;
        const newCard = responseData?.image || responseData;

        if (newCard && onUploadSuccess) {
            onUploadSuccess(newCard); // Отдаем объект наверх в EditGallery
        }

        event.target.value = '';
    };

    async function handleDelete() {
        const response = await $fetch(`posts/${id}/gallery/${image?.id}`, {method: "DELETE"})

        if (response?.response?.ok) {
            onRemove?.();
        }
    }

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div
                onClick={isAddImage ? handleTriggerSelect : undefined}
                className={`rounded-[8px] aspect-[9/6] relative glass-effect group transition-all duration-300 ${
                    isAddImage ? "cursor-pointer" : "cursor-move"
                }`}
            >
                {!isAddImage ? (
                    <>
                        <RoundedIconWrapper
                            className="!glass-effect absolute right-2 top-2 !w-[20px] z-10"
                            Icon={CloseIcon}
                            IconClassName="!text-[12px] text-text-main"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete()
                            }}
                        />
                        <img
                            src={image?.image_url}
                            alt="Gallery item"
                            className="w-full h-full object-cover rounded-[8px] pointer-events-none"
                        />
                    </>
                ) : (
                    <LocalSeeIcon
                        className="absolute top-[55%] left-[50%] text-text-main !text-[32px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                    />
                )}
            </div>
        </>
    );
}