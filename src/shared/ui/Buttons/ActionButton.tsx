import {Button, ButtonProps} from "@mui/material";
import {ElementType} from "react";

interface Props extends Omit<ButtonProps, 'startIcon'> {
    text?: string
    className?: string
    Icon?: ElementType
}

export default function ActionButton({text, Icon, className, ...props}: Props) {
    return (
        <Button
            className={`!rounded-xl !px-6 !py-2.5 !normal-case !text-text-muted !border-border-default hover:!bg-input transition-all ${className}`}
            variant="outlined"
            startIcon={Icon ? <Icon className="text-text-muted"/> : undefined}
            {...props}
        >
            <p className="text-small font-semibold">{text}</p>
        </Button>
    )
}