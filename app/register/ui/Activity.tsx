import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { ShadowWrapper } from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material";
import { COLORS, colorStyles } from "@/shared/styles/colors";
import { useEffect, useState } from "react";
import { $fetch } from "@/shared/api/fetch";

export default function Activity() {
    const [selectedSource, setSelectedSource] = useState(null)
    const [customText, setCustomText] = useState("")

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
            <div className="flex flex-col gap-4">
                <Heading variant="h4" className="text-gray-900">
                    Чем вы занимаетесь?
                </Heading>
            </div>

            <div className="mt-2">
                <PautinaText
                    variant="secondary"
                    className="text-gray-700 font-semibold"
                >
                    Ответ
                </PautinaText>

                <input name="text" defaultValue="" placeholder="Ответ" id="" className="w-full px-5 py-[15px] rounded-[6px]" style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}/>

            </div>


            <ShadowWrapper className="w-full">
                <Button
                    type="submit"
                    className="w-full"
                    style={{
                        marginTop: "15px",
                        background: colorStyles.buttons.brand.light,
                        padding: "16px 0px",
                        borderRadius: "12px",
                        width: "100%"
                    }}
                >
                    <PautinaText variant="button2" color={COLORS.white}>
                        Далее
                    </PautinaText>
                </Button>
            </ShadowWrapper>
        </div>
    );
}