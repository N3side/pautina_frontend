import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropDown from "@/shared/ui/DropDown/DropDown";
import {ButtonHTMLAttributes, ComponentType} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    text: string;
    Icon: ComponentType<any>;
}

function CustomButton({ className, text, Icon, ...props }: ButtonProps) {
    return (
        <button
            className={`!max-w-[200px] !w-full !text-left !px-4 !py-3 !text-sm !rounded-[8px] !text-text-main !hover:bg-neutral-500/10 !transition-colors ${className}`}
            {...props}
        >
            <div className="flex gap-3 items-center">
                <Icon className="!text-[20px] !text-text-muted" />
                <p className="w-fit text-text-muted font-semibold text-small">
                    {text}
                </p>
            </div>
        </button>
    );
}

interface Props {
    expandedButtons: Record<string, any> | null
    isMini?: boolean
    closeOnClick?: boolean
}

export default function ButtonOpener({expandedButtons, isMini=false, closeOnClick=false}: Props) {
    return (
        expandedButtons && Array.isArray(expandedButtons) && expandedButtons.length > 0 && (

            <DropDown
                trigger={
                    <RoundedIconWrapper
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                        Icon={MoreHorizIcon}
                        className={`!z-100 ${isMini ? "!w-7 !h-7" : ""}`}
                        iconClassname={isMini ? "!text-[18px]" : ""}
                    />

                }
                closeOnClick={closeOnClick}
            >
                <div className="glass-effect max-w-[220px] w-full rounded-2xl">
                    {expandedButtons.map((btn, i) => (
                        btn &&
                        <CustomButton
                            text={btn?.text}
                            Icon={btn?.Icon}
                            key={i}
                            onClick={btn?.onClick}
                        />
                    ))}
                </div>
            </DropDown>
        )
    )
}