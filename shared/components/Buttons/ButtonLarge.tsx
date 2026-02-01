import {COLORS, colorStyles} from "@/shared/styles/colors";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material"

export default function ButtonLarge({ children, className="", text="", ...props }) {
    return (
        <ShadowWrapper style={{width: "100%"}}>
            <Button
                {...props}
                type="submit"
                // sx — это стандарт для MUI, он работает лучше чем style
                className={className}
                sx={{
                    marginTop: "15px",
                    background: colorStyles.buttons.brand.light,
                    padding: "15px 0px",
                    borderRadius: "12px",
                    width: "100%",
                    textTransform: "none", // Чтобы текст не был капсом по умолчанию

                    // Убираем конфликт: анимируем только трансформацию
                    transition: "transform 0.1s ease-in-out !important",

                    "&:active": {
                        transform: "scale(0.97)",
                        background: colorStyles.buttons.brand.light, // Чтобы цвет не мигал при нажатии
                    },

                    // Если хочешь совсем убрать "бульканье" эффекта волны:
                    // disableRipple: true
                }}
            >

                {text ? (
                    <PautinaText variant="button2" className="text-white font-bold">
                        {text}
                    </PautinaText>
                ) :
                    <PautinaText variant="button2" className="text-white font-bold">
                        {children}
                    </PautinaText>
                }

            </Button>
        </ShadowWrapper>
    );
}