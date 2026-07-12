import EmojiDropdown from "@/features/select-emoji/EmojiDropdown";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import {HTMLAttributes} from "react";
import AdjustableText from "@/shared/ui/adjustable-text/AdjustableText";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import toast from "react-hot-toast";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";

interface Props extends HTMLAttributes<HTMLDivElement> {
    text: string
    setText: (any) => any
    className?: string
    handleSend: (any) => any
    placeholder?: string
    handleTriggerSelect?: () => void
}

export default function MessageForm({text, setText, handleSend, className, placeholder, handleTriggerSelect, ...props}: Props) {

    return (
        <div onClick={(e) => e.stopPropagation()} className={`flex w-full items-end gap-3.5 0 rounded-2xl px-4 py-3 glass-effect ${className}`} {...props}>

            <EmojiDropdown
                text={text}
                setText={setText}
                trigger={
                    <RoundedIconWrapper
                        btnHeight={20}
                        Icon={MoodIcon}
                    />
                }
            />


            <AdjustableText text={text} setText={setText} placeholder={placeholder} />

            {handleTriggerSelect &&
                <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} btnHeight={20} btnWidth={20} />
            }

            <RoundedIconWrapper
                btnHeight={20}
                Icon={SendIcon}
                disabled={!text.trim()}
                className={`${text.trim() ? "text-text-main" : "text-text-muted/50 cursor-not-allowed"}`}
                onClick={handleSend}
            />

        </div>
    )
}