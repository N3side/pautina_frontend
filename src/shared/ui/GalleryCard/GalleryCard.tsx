import CloseIcon from '@mui/icons-material/Close';
import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import {checkIsVideo} from "@/shared/lib/utils/checkIsVideo";

interface Props {
    image?: Record<string, any>;
    isAddImage?: boolean;
    fileInputRef: any
    handleTriggerSelect: () => any
    handleDelete: () => any
    handleFileChange: () => any
    isVideo: boolean
    className?: string
}

export default function GalleryCard({
        image,
        isAddImage = false,
        fileInputRef,
        handleTriggerSelect,
        handleDelete,
        handleFileChange,
        className
    }: Props) {

    const isVideo = checkIsVideo(image?.image_url)

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*, video/*"
                className="hidden"
            />

            <div
                onClick={isAddImage ? handleTriggerSelect : undefined}
                className={`rounded-[8px] aspect-[9/6] relative glass-effect group transition-all duration-300 overflow-hidden ${
                    isAddImage ? "cursor-pointer" : "cursor-move"
                } ${className}`}
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

                        {/* Рендерим по условию: либо видео, либо картинку */}
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