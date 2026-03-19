import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
    avatar: string
}

export default function Avatar({avatar}: Props) {
    return (
        <div className="p-[2px] rounded-full cursor-pointer flex items-center group">
            <div className="h-[42px] w-[42px] rounded-full overflow-hidden relative flex items-center border border-transparent hover:border-brand transition-all duration-300">
                <img
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                    src={avatar}
                    alt="avatar"
                />
            </div>
            <KeyboardArrowDownIcon className="text-text-muted !text-[18px]" />
        </div>
    )
}