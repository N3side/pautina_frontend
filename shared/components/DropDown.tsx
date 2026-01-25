'use client'; // Обязательно для Next.js App Router

import React from 'react';
import Menu from '@mui/material/Menu';
import {useMenu} from "@/shared/components/useMenu";

interface DropdownProps {
    trigger: React.ReactNode; // Элемент, по которому кликаем (кнопка, иконка)
    children: React.ReactNode; // Пункты меню (MenuItem)
    menuClassName?: string;    // Опционально: Tailwind классы для самого меню
}

const DropDown = ({ trigger, children, menuClassName = '' }: DropdownProps) => {
    const { anchorEl, open, handleOpen, handleClose } = useMenu();

    return (
        <>
            {/* Обертка для триггера.
                CloneElement здесь не используем для простоты типов,
                просто оборачиваем в div или span, либо накидываем onClick на сам trigger,
                если trigger это обычный button.
                Самый надежный вариант — span/div wrapper.
              */}
            <span onClick={handleOpen} className="cursor-pointer inline-block">
        {trigger}
      </span>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose} // Закрывать меню при клике на любой пункт
                disableScrollLock={true} // Чтобы не прыгал скролл (опционально)
                slotProps={{
                    paper: {
                        // Здесь можно смешивать стили MUI и Tailwind
                        className: `mt-2 shadow-lg rounded-lg overflow-hidden ${menuClassName}`,
                        elevation: 0, // Убираем дефолтную тень MUI, если хотим свою через Tailwind
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {children}
            </Menu>
        </>
    );
};

export default DropDown;