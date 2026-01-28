'use client';

import React from 'react';
import Menu from '@mui/material/Menu';
import {useMenu} from "@/shared/components/useMenu";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    menuClassName?: string;
}

const DropDown = ({ trigger, children, menuClassName = '' }: DropdownProps) => {
    const { anchorEl, open, handleOpen, handleClose } = useMenu();

    return (
        <>
            <span onClick={handleOpen} className="cursor-pointer inline-block">
                {trigger}
            </span>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock={true}
                slotProps={{
                    paper: {
                        className: `shadow-lg rounded-lg bg-transparent ${menuClassName}`,
                        elevation: 0,
                        sx: {
                            // Убираем все дефолтные отступы MUI
                            '& .MuiMenu-list': {
                                padding: 0,
                            },
                            // Убираем белый фон если нужно
                            backgroundColor: 'transparent',
                            // Или устанавливаем свой фон
                            // backgroundColor: '#f5f5f5',
                        }
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