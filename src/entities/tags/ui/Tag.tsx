import RoundedIconWrapper from "@/shared/ui/Buttons/RoundedIconWrapper";

interface Props {
    tag?: string
    color?: string
    onRemove?: (args?: any) => void
}

import CloseIcon from '@mui/icons-material/Close';

export default function Tag({tag="", color="#6366f1", onRemove}: Props) {
    return (
        <span className="w-fit px-3 py-1 rounded-full inline-flex items-center gap-1 group " style={{background: `${color}10`, border: `1px solid ${color}20`}}>
            <p className="text-tiny font-bold" style={{color: color}}>
                {tag}
            </p>
            {onRemove && (
                <RoundedIconWrapper
                    style={{
                        background: color
                    }}
                    Icon={CloseIcon}
                    onClick={onRemove}
                />
            )}
        </span>
    )
}