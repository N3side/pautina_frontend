import { PautinaText } from "@/shared/cat/typography/text"
import {colorStyles} from "@/shared/cat/colors";


interface Props {
    Icon: any
    k: string
    value?: string
}

export function Elem({Icon, k, value}: Props) {

    return (
        <li className="flex gap-[15px] items-center">
            <div className="icon">
                <Icon />
            </div>
            <div className="flex flex-col gap-[2px]">
                <PautinaText variant="tiny" color={colorStyles.text.p_tiny.light} style={{textTransform: "uppercase", fontWeight: 500}}>
                    {k}
                </PautinaText>
                <PautinaText variant="secondary" color={colorStyles.text.h6.light} style={{fontWeight: 500}}>
                    {value}
                </PautinaText>
            </div>
        </li>
    )
}