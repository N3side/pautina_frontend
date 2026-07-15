import {useEffect, useState} from "react";
import ParsedContentText from "@/shared/lib/utils/ParsedContentText";

interface Props {
    text: string
    previewLength?: number
    className?: string
    canCloseOnExpanded?: boolean
    isExpandedDefault?: boolean
    textClassName?: string
}

export default function ExpandText({text, textClassName, previewLength=50, className, canCloseOnExpanded=true, isExpandedDefault=false}: Props) {

    const [isExpanded, setIsExpanded] = useState<boolean>(isExpandedDefault);

    const text_ = text || "";
    const isLongText = text_.length > previewLength;

    const displayedText = isLongText && !isExpanded
        ? `${text_.slice(0, previewLength)}...`
        : text_;

    return (
        <div className={`text-text-main/90 text-small font-normal leading-snug mt-1 break-all w-full min-w-0 ${className}`}
             onClick={(e) => {
                 e.stopPropagation();


                 if (!isExpanded) {
                    setIsExpanded(true)
                 } else if (canCloseOnExpanded) {
                    setIsExpanded(false)
                 }

             }}
        >
            <span>{displayedText && <ParsedContentText className={`${textClassName}`} content={displayedText} />}</span>

            {isLongText && (
                <button
                    type="button"
                    className="text-text-main font-bold hover:underline cursor-pointer inline text-[15px]"
                >
                    {isExpanded ? canCloseOnExpanded && "Скрыть" : "Ещё"}
                </button>
            )}
        </div>
    )
}