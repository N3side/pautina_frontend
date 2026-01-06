import { createPortal } from "react-dom"
import { useContext, useEffect, useRef, useState, ReactNode, ReactPortal } from "react"
import { Button } from "@mui/material"
import { Close } from "@/shared/vector/Close"
import { IconWrapper } from "@/shared/components/IconWrapper"
import { WindowContext } from "@/shared/providers/WindowProvider"
import {BodyBlockContext} from "@/shared/providers/BodyBlockProvider";



export function useModal({ children }) {
    const { _window } = useContext(WindowContext)
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    /* ------------------------------------------------------------------ */
    /* control body blocking                                              */
    /* ------------------------------------------------------------------ */

    const {isBlocked, setIsBlocked} = useContext(BodyBlockContext)

    useEffect(() => {
        setIsBlocked(isOpen)
    }, [isOpen])

    /* ------------------------------------------------------------------ */
    /* bottom-sheet drag logic                                             */
    /* ------------------------------------------------------------------ */
    const sheetRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [startHeight, setStartHeight] = useState(0)

    const isMobile = _window?.innerWidth && _window.innerWidth < 1024

    // init height on open
    useEffect(() => {
        if (!isOpen || !_window) return
        const initialHeight = isMobile ? _window.innerHeight * 0.95 : 740
        setHeight(initialHeight)
    }, [isOpen, _window?.innerWidth, _window?.innerHeight])

    const onPointerDown = (e: React.PointerEvent) => {
        if (!isMobile || !sheetRef.current || height === null) return
        setIsDragging(true)
        setStartY(e.clientY)
        setStartHeight(height)
    }

    useEffect(() => {
        if (!isDragging || !isMobile) return

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging || height === null) return;

            const delta = e.clientY - startY;
            const nextHeight = startHeight - delta;

            if (nextHeight <= 0) {
                close();
                setIsDragging(false);
                return;
            }

            setHeight(nextHeight);
        };

        const onPointerUp = () => {
            setIsDragging(false)
            if (height !== null && height <= 100) {
                close()
            }
        }

        window.addEventListener("pointermove", onPointerMove)
        window.addEventListener("pointerup", onPointerUp)
        window.addEventListener("pointercancel", onPointerUp)

        return () => {
            window.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerup", onPointerUp)
            window.removeEventListener("pointercancel", onPointerUp)
        }
    }, [isDragging, startY, startHeight, height, isMobile])

    /* ------------------------------------------------------------------ */
    /* render                                                              */
    /* ------------------------------------------------------------------ */
    const shouldRender = isOpen && (height !== null || !isMobile)

    const modal: ReactPortal | null = shouldRender
        ? createPortal(
            <div
                className={`fixed inset-0 z-[30] flex ${
                    isMobile ? "items-end justify-center" : "items-center justify-center"
                }`}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={close} />

                {/* sheet */}
                <div
                    ref={sheetRef}
                    className={`relative bg-white w-full max-w-[1024px] touch-none ${
                        isMobile ? "rounded-b-none" : "rounded-[24px]"
                    }`}
                    onPointerDown={isMobile ? onPointerDown : undefined}
                    style={
                        isMobile
                            ? {
                                height,
                                width: "100%",
                                transition: isDragging ? "none" : "height 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                maxHeight: "95vh"
                            }
                            : { maxHeight: "740px", height: "100%" }
                    }
                >
                    {/* desktop close */}
                    {!isMobile && (
                        <Button
                            type="button"
                            onClick={close}
                            style={{ position: "absolute", top: 20, right: 20, minWidth: 0 }}
                        >
                            <IconWrapper style={{ padding: 8 }}>
                                <Close />
                            </IconWrapper>
                        </Button>
                    )}

                    {isMobile && (
                        <div
                            onPointerDown={onPointerDown}
                            className="absolute top-[-14px] left-1/2 h-[8px] w-[80px] rounded-[20px] bg-[#d2d2d2] touch-none"
                            style={{ transform: "translateX(-50%)" }}
                        />
                    )}

                    {children}
                </div>
            </div>,
            document.body
        )
        : null

    return {
        isOpen,
        open,
        close,
        modal,
    }
}
