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
    fontWeight?: string
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
        fontWeight: "500",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.1"
    },
    default: {
        fontSize: textSizes.default,
        fontWeight: "400",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.61"
    },
    secondary: {
        fontSize: textSizes.secondary,
        fontWeight: "400",
        fontFamily: Montserrat.style.fontFamily,
    },
    small: {
        fontSize: textSizes.small,
        fontWeight: "400",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.43"
    },
    tiny: {
        fontSize: textSizes.tiny,
        fontWeight: "400",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.33"
    },

    //
    button: {
        fontSize: "clamp(14px, 0.250vw + 13.200px, 18px)",
        fontWeight: "700",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.55"
    },

    button2: {
        fontSize: "clamp(12px, 0.125vw + 11.600px, 14px)",
        fontWeight: "700",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.55"
    },
}


function PautinaText({ component = 'p', variant = 'default', color = colorStyles.text.p["light"], children, className, style }: TextProps) {
    return React.createElement(
        component,
        {
            className: className,
            style: {
                ...textStyles[variant],
                fontFamily: Montserrat.style.fontFamily,
                color,
                ...style
            },
        },
        children
    );
}

export { PautinaText }