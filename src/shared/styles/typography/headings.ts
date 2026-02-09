import React from "react";
import { colorStyles } from "../colors";
import { TextProps } from "./text";
import { HeadingVariantsType } from "@/shared/types/typography";
import { Montserrat } from "./connectFonts";

export interface HeadingProps extends Omit<TextProps, 'variant'> {
    variant?: HeadingVariantsType;
    order?: HeadingVariantsType;
}


const textStyles = {
    h1: {
        fontSize: "clamp(34px, 1.625vw + 28.800px, 60px)", // 32px -> 48px (360px -> 1920px))
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1"
    },
    h2: {
        fontSize: "3rem",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.1"
    },
    h3: {
        fontSize: "clamp(28px, 0.750vw + 25.600px, 40px)",
        fontFamily: Montserrat.style.fontFamily,
    },
    h4: {
        fontSize: "clamp(22px, 0.500vw + 20.400px, 30px)",
        fontFamily: Montserrat.style.fontFamily,
        lineHeight: "1.2"
    },
    h5: {
        fontSize: "clamp(20px, 0.250vw + 19.200px, 24px)",
        fontFamily: Montserrat.style.fontFamily,
    },
    h6: {
        fontSize: "clamp(16px, 0.250vw + 15.200px, 20px)",
        fontFamily: Montserrat.style.fontFamily,
    },
    
};

function Heading({
    variant = 'h1',
    order = 'h1',
    className = "text-text-main font-bold",
    children,
}: HeadingProps) {
    return React.createElement(
        order,
        {
            className: className,
            style: {
                ...textStyles[variant],
            },
        },
        children
    );
}

export { Heading }