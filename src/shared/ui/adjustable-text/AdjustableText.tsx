import {smooth} from "@/shared/styles/animations";
import {useEffect, useRef} from "react";

interface Props {
    text: string
    setText: (any) => void
    placeholder?: string
    wrapperClassName?: string
    textAreaClassName?: string
}

export default function AdjustableText({text, setText, placeholder="Комментарий", wrapperClassName, textAreaClassName}: Props) {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Сброс
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    useEffect(() => {
        adjustHeight();
    }, [text])

    return (
        <div className={`min-h-[20px] w-full flex gap-2 ${wrapperClassName}`}>
            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={1}
                placeholder={placeholder}
                className={`flex-1 outline-none text-text-main !text-small placeholder:text-text-muted/60 resize-none bg-transparent !min-h-0 w-full ${smooth} ${textAreaClassName}`}
            />
        </div>
    )
}