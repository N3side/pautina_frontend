import { PautinaText } from "@/shared/styles/typography/text"
import {colorStyles} from "@/shared/styles/colors";


interface Props {
    Icon: any
    k: string
    value?: string
}

export function Elem({Icon, k, value}: Props) {

    return (
        <div className="flex gap-[15px] items-center">
            <div className="icon">
                <Icon />
            </div>
            <div className="flex flex-col gap-[2px]">
                <p className="text-tiny text-text-muted uppercase font-medium">
                    {k}
                </p>
                <p className="text-secondary text-text-muted font-medium">
                    {value}
                </p>
            </div>
        </div>
    )
}