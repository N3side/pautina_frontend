import { ComponentType, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: ComponentType<any>;
    className?: string;
    iconClassname?: string;
    hitboxHeight?: number;
    hitboxWidth?: number;
    btnHeight?: number;
    btnWidth?: number;
}

export default function RoundedIconWrapper({
       Icon,
       className,
       iconClassname,
       hitboxHeight = 40,
       hitboxWidth = 40,
       btnWidth = 20,
       btnHeight = 20,
       ...props
   }: Props) {
    return (
        <div
            className={`group relative inline-flex items-center justify-center p-0 min-h-0 min-w-0 rounded-full border-none outline-none bg-transparent cursor-pointer
                after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-all after:duration-300 ${className}`}
            style={{
                ...props.style,
                // Добавил px, чтобы стили кнопки не ломались в браузере
                height: `${btnHeight}px`,
                width: `${btnWidth}px`,
                // @ts-ignore
                "--hb-h": `${hitboxHeight}px`,
                // @ts-ignore
                "--hb-w": `${hitboxWidth}px`,
            }}
            {...props}
        >
            <Icon
                key="inactive"
                className={`text-text-muted transition-transform duration-300 group-hover:scale-110 !w-5 !h-5 text-[20px] ${iconClassname}`}
                style={{ width: "20px", height: "20px" }}
            />
            <style>{`
                button::after {
                    height: var(--hb-h) !important;
                    width: var(--hb-w) !important;
                }
                button:hover::after {
                    background-color: rgba(115, 115, 115, 0.1) !important;
                }
            `}</style>
        </div>
    );
}