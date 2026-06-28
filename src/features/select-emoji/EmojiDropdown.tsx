import EmojiPicker, {Theme} from 'emoji-picker-react';
import React from "react";
import DropDown from "@/shared/ui/DropDown/DropDown";
import {useTheme} from "@/shared/lib/providers/ThemeProvider";

interface Props {
    trigger: React.ReactNode
    text: string
    setText: (text) => void
}

export default function EmojiDropdown({text, setText, trigger}: Props) {

    return (
        <DropDown
            trigger={trigger}
            closeOnClick={false}
            menuClassName="!bg-surface !rounded-2xl"
        >
            <EmojiPicker
                theme={Theme.AUTO}
                onEmojiClick={(emojiData) => {
                    setText(prev => prev + emojiData.emoji)
                }}
                searchDisabled={false}
                skinTonesDisabled={false}
                style={{
                    '--epr-bg-color': 'transparent',                  // Прозрачный основной фон
                    '--epr-category-label-bg-color': 'transparent',   // Прозрачный фон плашек категорий
                    '--epr-border-color': 'transparent',              // Убираем дефолтную рамку
                    boxShadow: 'none',                                // Убираем дефолтную тень
                } as React.CSSProperties}
            />
        </DropDown>
    )
}