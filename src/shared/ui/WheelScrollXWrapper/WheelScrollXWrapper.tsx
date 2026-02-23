import { ReactNode, useEffect, useRef, useState } from "react";
import { CSSProperties } from "@mui/material";

interface WheelXScrollProviderProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function WheelXScrollProvider({ children, className = "", style }: WheelXScrollProviderProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!ref.current) return;
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !ref.current) return;
            const x = e.pageX - ref.current.offsetLeft;
            const walk = x - startX;
            ref.current.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);


    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            className={`cursor-grab w-fit gap-[5px] max-w-[fit-content] mt-5 select-none flex w-full overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
            style={style}
        >
            {children}
        </div>
    )
}