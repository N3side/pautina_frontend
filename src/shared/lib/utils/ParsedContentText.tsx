import React from 'react';

// Регулярка для поиска эмодзи в тексте
const EMOJI_REGEX = /(\p{Extended_Pictographic})/gu;

interface Props {
    content: string
    className?: string
}

export default function ParsedContentText({ content, className }: Props) {
    const parts = content.split(EMOJI_REGEX);

    return (
        <p className={`text-text-main leading-relaxed ${className}`}>
        {parts.map((part, index) => {
                // Если эта часть — эмодзи, оборачиваем в спан с увеличенным шрифтом
                if (EMOJI_REGEX.test(part)) {
                    return (
                        <span key={index} className="text-xl inline-block align-middle mx-0.5">
                        {part}
                        </span>
                );
                }
                // Если обычный текст — возвращаем как есть
                return part;
            })}
        </p>
    );
}