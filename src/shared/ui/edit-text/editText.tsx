import AdjustableText from "@/shared/ui/adjustable-text/AdjustableText";
import EmojiDropdown from "@/features/select-emoji/EmojiDropdown";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";

interface Props {
    text: string
    setText: (text: string) => void
    handleTriggerSelect?: () => void
}

export default function EditText({text, setText, handleTriggerSelect}: Props) {
    return (
        <div className="flex items-start border-b pb-1 mt-2 border-text-main" onClick={(e) => e.stopPropagation()}>
            <AdjustableText
                text={text}
                setText={setText}
                placeholder="Контент"
            />

            {handleTriggerSelect &&
                <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} hitboxHeight={40} btnWidth={40} hitboxWidth={40} />
            }


            <EmojiDropdown trigger={
                <RoundedIconWrapper btnHeight={20} btnWidth={40} Icon={SentimentSatisfiedOutlinedIcon} />
            } text={text} setText={setText} />

        </div>
    )
}