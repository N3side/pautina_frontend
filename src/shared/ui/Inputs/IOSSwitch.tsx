import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material";

// Расширяем пропсы, чтобы принимать кастомный размер
interface StyledSwitchProps extends SwitchProps {
    scale?: number;
}

export const IOSSwitch = styled((props: StyledSwitchProps) => (
    // Удаляем scale из пропсов перед тем, как прокинуть их в MUI Switch
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...{...props, scale: undefined}}
    />
))(({ theme, scale = 1 }) => {
    // Базовые значения
    const baseHeight = 26 * scale;
    const baseWidth = 48 * scale;
    const margin = 2 * scale;
    const thumbSize = (baseHeight - (margin * 2)); // Авто-расчет кружка
    const translateDist = baseWidth - thumbSize - (margin * 2); // Идеальный сдвиг

    return {
        width: baseWidth,
        height: baseHeight,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: margin,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: `translateX(${translateDist}px)`, // Динамический сдвиг
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: "var(--color-brand)",
                    opacity: 1,
                    border: 0,
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: thumbSize,
            height: thumbSize,
        },
        '& .MuiSwitch-track': {
            borderRadius: baseHeight / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    };
});