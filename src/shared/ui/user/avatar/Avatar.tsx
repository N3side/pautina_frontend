import { HTMLAttributes } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props extends HTMLAttributes<HTMLDivElement> {
    avatar: string;
}

// Принимаем ...props, в которых прилетит onClick от DropDown
export default function Avatar({ avatar, className = "", ...props }: Props) {
    return (
        <div
            {...props} // Прокидываем onClick и остальные пропсы на корневой div
            className={`p-[2px] rounded-full cursor-pointer flex items-center group ${className}`}
        >
            <div className="h-[42px] w-[42px] rounded-full overflow-hidden relative flex items-center border border-transparent hover:border-brand transition-all duration-300">
                <img
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                    src={avatar}
                    alt="avatar"
                />
            </div>
            <KeyboardArrowDownIcon className="text-text-muted !text-[18px]" />
        </div>
    );
}