"use client";

import CloseIcon from '@mui/icons-material/Close';
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import { checkIsVideo } from "@/shared/lib/utils/checkIsVideo";

interface Props {
    image: Record<string, any>;
    onRemove?: () => void;
}

export default function GalleryCard({ image, onRemove }: Props) {
    const isVideo = checkIsVideo(image?.image_url);

    return (
        <div className="rounded-[8px] aspect-[9/6] relative glass-effect group transition-all duration-300 overflow-hidden cursor-move">
            {onRemove && (
                <RoundedIconWrapper
                    className="!glass-effect absolute right-2 top-2 !w-[20px] z-10"
                    Icon={CloseIcon}
                    IconClassName="!text-[12px] text-text-main"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                />
            )}

            {isVideo ? (
                <video
                    src={image?.image_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-[8px] pointer-events-none"
                />
            ) : (
                <img
                    src={image?.image_url}
                    alt="Gallery item"
                    className="w-full h-full object-cover rounded-[8px] pointer-events-none"
                />
            )}
        </div>
    );
}