import React from "react";
import { ReactNode, CSSProperties } from "react";
import { TextVariantsType } from "@/types/typography";
import { Montserrat } from "./connectFonts";
import { colorStyles } from "../colors";

export interface TextProps {
    component?: React.ElementType;
    variant?: TextVariantsType;
    color?: string;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const textSizes = {
    large: "clamp(16px, 0.250vw + 15.200px, 20px)",
    default: "clamp(16px, 0.125vw + 15.600px, 18px)",
    secondary: "clamp(14px, 0.125vw + 13.600px, 16px)",
    small: "clamp(12px, 0.125vw + 11.600px, 14px)",
    tiny: "clamp(10px, 0.125vw + 9.600px, 12px)",
}

const textStyles = {
    large: {
        fontSize: textSizes.large,
        fontFamily: Montserrat.style.fontFamily,
    },
    default: {
        fontSize: textSizes.default,
        fontFamily: Montserrat.style.fontFamily,
    },
    secondary: {
        fontSize: textSizes.secondary,
        fontFamily: Montserrat.style.fontFamily,
    },
    small: {
        fontSize: textSizes.small,
        fontFamily: Montserrat.style.fontFamily,
    },
    tiny: {
        fontSize: textSizes.tiny,
        fontFamily: Montserrat.style.fontFamily,
    },

    button: {
        fontSize: "clamp(14px, 0.250vw + 13.200px, 18px)",
        fontFamily: Montserrat.style.fontFamily,
    },

    button2: {
        fontSize: "clamp(12px, 0.125vw + 11.600px, 14px)",
        fontFamily: Montserrat.style.fontFamily,
    },
}


function PautinaText({ component = 'p', variant = 'default', children, className="text-text-muted", style, ...props }: TextProps) {

    return React.createElement(
        component,
        {
            className: className,
            style: {
                ...textStyles[variant],
                fontFamily: Montserrat.style.fontFamily,
                ...style
            },
            ...props
        },
        children
    );
}

export { PautinaText }