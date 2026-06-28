import {useState} from "react";
import ParsedContentText from "@/shared/lib/utils/ParsedContentText";

interface Props {
    text: string
    previewLength?: number
    className?: string
}

export default function ExpandText({text, previewLength=50, className}: Props) {

    // Раскрытие текста
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const text_ = text || "";
    const isLongText = text_.length > previewLength;

    // Если текст длинный и не развернут — обрежем его, иначе покажем полностью
    const displayedText = isLongText && !isExpanded
        ? `${text_.slice(0, previewLength)}...`
        : text_;

    return (
        <div className={`text-text-main/90 text-small font-normal leading-snug whitespace-pre-wrap mt-1 break-all w-full min-w-0 ${className}`}
             onClick={(e) => {
                 e.stopPropagation();
                 setIsExpanded(!isExpanded);
             }}
        >
            <span>{displayedText && <ParsedContentText content={displayedText} />}</span>

            {isLongText && (
                <button
                    type="button"
                    className="text-text-main font-bold hover:underline ml-1 cursor-pointer inline text-[15px]"
                >
                    {isExpanded ? "Скрыть" : "Ещё"}
                </button>
            )}
        </div>
    )
}