import EmojiDropdown from "@/features/select-emoji/EmojiDropdown";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import {HTMLAttributes} from "react";
import AdjustableText from "@/shared/ui/adjustable-text/AdjustableText";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.ElementType;
}

function IconButton({ Icon, className, ...props }: IconButtonProps) {
    return (
        <button
            className={`transition-all duration-200 active:scale-95 !w-fit !h-fit aspect-square text-text-muted hover:text-text-main flex justify-center items-center ${className || ""}`}
            {...props}
        >
            <Icon className="!text-[24px]" />
        </button>
    );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    text: string
    setText: (any) => any
    className?: string
    handleSend: (any) => any
}

export default function MessageForm({text, setText, handleSend, className, ...props}: Props) {
    return (
        <div  onClick={(e) => e.stopPropagation()} className={`flex w-full items-end gap-3.5 0 rounded-2xl px-4 py-3 glass-effect ${className}`} {...props}>

            <EmojiDropdown
                text={text}
                setText={setText}
                trigger={
                    <RoundedIconWrapper
                        btnHeight={20}
                        Icon={MoodIcon}
                    />
                } />

            <AdjustableText text={text} setText={setText} />

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