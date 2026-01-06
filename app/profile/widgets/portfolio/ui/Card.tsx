import Calendar from "@/shared/vector/Calendar";
import {PautinaText} from "@/shared/styles/typography/text";
import {Button} from "@mui/material";

import Download from "@/shared/vector/Download";
import {IconWrapper} from "@/shared/components/IconWrapper";

import { cardProps } from "../model/index"
import {COLORS, colorStyles} from "@/shared/styles/colors";

export default function Card(card: cardProps) {
    return (
        <div className="relative" onClick={card?.onClick}>

            <PautinaText variant="small" className="absolute px-[10px] py-[2.5px] bg-white rounded-[8px] top-[10px] left-[10px]" style={{
                fontWeight: 500
            }}>
                {card?.category}
            </PautinaText>

            <img src={card?.image} alt="" className="rounded-[10px]" />

            <div className="mt-[clamp(10px,0.625vw_+_8.000px,20px)] px-[clamp(10px,0.625vw_+_8.000px,20px)]">
                <div className="flex items-center gap-[5px]">
                    <Calendar />
                    <PautinaText variant="tiny" color={colorStyles.text.p_tiny.light}>
                        {card?.date}
                    </PautinaText>
                </div>

                <PautinaText className="mt-[8px]" variant="default" color={COLORS.black} style={{
                    fontWeight: 600
                }}>
                    {card?.title}
                </PautinaText>

                <div className="mt-[clamp(25px,0.938vw_+_22.000px,40px)] flex items-center justify-between">
                    <PautinaText variant="secondary">
                        {card?.type}
                    </PautinaText>

                    <Button style={{minWidth: "0px", padding: "16px"}}>
                        <IconWrapper>
                            <Download />
                        </IconWrapper>
                    </Button>
                </div>

            </div>
        </div>
    )
}