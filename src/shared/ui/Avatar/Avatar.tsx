import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    image_url: string
    className?: string
}

export default function Avatar({image_url, className, ...props}: Props) {
    return (
        <div className={`w-11 h-11 rounded-full overflow-hidden shrink-0 bg-surface ${className}`} {...props}>
            <img src={image_url} className="w-full h-full object-cover" alt="Author"/>
        </div>
    )
}