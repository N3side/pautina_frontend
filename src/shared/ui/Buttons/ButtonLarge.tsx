import {colorStyles} from "@/shared/styles/colors";
import {ShadowWrapper} from "@/shared/ui/Wrappers/Shadow";
import {Button} from "@mui/material"

export default function ButtonLarge({ children, className="", text="", ...props }) {
    return (
        <ShadowWrapper style={{width: "100%"}}>
            <Button
                {...props}
                type="submit"
                // sx — это стандарт для MUI, он работает лучше чем style
                className={`!mt-[15px] !py-[15px] !rounded-xl !w-full !transform-none !bg-[var(--color-brand)] ${className}`}
                sx={{
                    textTransform: "none", // Чтобы текст не был капсом по умолчанию
                    // Убираем конфликт: анимируем только трансформацию
                    transition: "transform 0.1s ease-in-out !important",

                    "&:hover": {
                        transform: "scale(0.97)",
                        background: colorStyles.buttons.brand.light,
                    },
                }}
            >

                {text ? (
                    <p className="text-button-sm text-white">{text}</p>
                ) :
                    <p className="text-button-sm text-white">{children}</p>
                }

            </Button>
        </ShadowWrapper>
    );
}