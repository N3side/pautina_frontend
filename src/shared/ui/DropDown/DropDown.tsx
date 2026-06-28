'use client';

import React from 'react';
import Menu from '@mui/material/Menu';
import {useMenu} from "@/shared/ui/DropDown/useMenu";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    menuClassName?: string;
    closeOnClick?: boolean
}

const DropDown = ({ trigger, children, menuClassName = '', closeOnClick=false }: DropdownProps) => {
    const { anchorEl, open, handleOpen, handleClose } = useMenu();

    // Клонируем триггер и подмешиваем ему onClick
    const renderTrigger = () => {
        if (!React.isValidElement(trigger)) return trigger;

        return React.cloneElement(trigger as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                // Вызываем родной onClick триггера, если он был
                if (trigger.props.onClick) {
                    trigger.props.onClick(e);
                }
                // Открываем меню
                handleOpen(e);
            }
        });
    };

    return (
        <>
            {renderTrigger()}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={() => closeOnClick && handleClose()}
                disableScrollLock={true}
                slotProps={{
                    paper: {
                        className: `shadow-lg rounded-lg bg-transparent ${menuClassName}`,
                        elevation: 0,
                        sx: {
                            '& .MuiMenu-list': {
                                padding: 0,
                            },
                            backgroundColor: 'transparent',
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