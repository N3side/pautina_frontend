import {ReactNode} from "react";
import {Button, ButtonProps} from "@mui/material";

interface Props extends ButtonProps {
    children: ReactNode
    className?: string
}

export default function BrandActionButton({children, className, ...props}: Props) {
    return (
        <Button
            className={`!text-button-sm !h-11 !px-6 !bg-brand !rounded-xl !hover:bg-brand-hover !transition-all !shadow-lg !shadow-brand/20 !active:scale-95 ${className}`}
            {...props}
        >
            <p className="text-white font-semibold text-small capitalize">{children}</p>
        </Button>
    )
}