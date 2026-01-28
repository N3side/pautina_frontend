import { createPortal } from "react-dom"
import { useContext, useEffect, useRef, useState, ReactPortal } from "react"
import { Button } from "@mui/material"
import { Close } from "@/shared/vector/Close"
import { IconWrapper } from "@/shared/components/IconWrapper"
import { BodyBlockContext } from "@/shared/providers/BodyBlockProvider"

// Используем CSS-переменные напрямую для скроллбара
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--border-default); /* Адаптивный цвет */
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-muted); /* Цвет при наведении */
  }
`

export function useModal({ children, modalClassName = "", onClose = () => {} }) {
    const [isOpen, setIsOpen] = useState(false)
    const { setIsBlocked } = useContext(BodyBlockContext)

    const open = () => setIsOpen(true)
    const close = () => {
        onClose()
        setIsOpen(false)
        setTranslateY(0)
    }

    // Блокировка скролла страницы
    useEffect(() => {
        setIsBlocked(isOpen)
    }, [isOpen, setIsBlocked])

    // Закрытие по Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && e.key === "Escape") close()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    /* ------------------------------------------------------------------ */
    /* Drag Logic                                                         */
    /* ------------------------------------------------------------------ */
    const [isDragging, setIsDragging] = useState(false)
    const [translateY, setTranslateY] = useState(0)
    const startY = useRef(0)
    const currentY = useRef(0)

    const onPointerDown = (e: React.PointerEvent) => {
        setIsDragging(true)
        startY.current = e.clientY
    }

    useEffect(() => {
        if (!isDragging) return

        const onPointerMove = (e: PointerEvent) => {
            const delta = e.clientY - startY.current
            if (delta < 0) {
                setTranslateY(0)
                return
            }
            setTranslateY(delta)
            currentY.current = delta
        }

        const onPointerUp = () => {
            setIsDragging(false)
            if (currentY.current > 150) {
                close()
            } else {
                setTranslateY(0)
            }
            currentY.current = 0
        }

        window.addEventListener("pointermove", onPointerMove)
        window.addEventListener("pointerup", onPointerUp)
        window.addEventListener("pointercancel", onPointerUp)

        return () => {
            window.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerup", onPointerUp)
            window.removeEventListener("pointercancel", onPointerUp)
        }
    }, [isDragging])

    /* ------------------------------------------------------------------ */
    /* Render                                                             */
    /* ------------------------------------------------------------------ */
    const modal: ReactPortal | null = isOpen
        ? createPortal(
            <>
                <style>{scrollbarStyles}</style>
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`fixed inset-0 z-[30] flex items-end justify-center md:items-center ${modalClassName}`}
                >
                    {/* Overlay: Используем стандартный черный с прозрачностью, так как это затенение */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
                        onClick={close}
                    />

                    {/* Sheet / Modal Container */}
                    <div
                        className={`
                            relative shadow-xl flex flex-col
                            
                            /* THEME COLORS APPLIED HERE */
                            bg-surface text-text-main
                            
                            /* Mobile: Bottom Sheet */
                            w-full rounded-t-[24px] rounded-b-none 
                            max-h-[95vh] h-auto
                            
                            /* Desktop: Centered Modal */
                            md:max-w-[1024px] md:rounded-[24px] md:max-h-[740px] md:h-full
                        `}
                        style={{
                            transform: `translateY(${translateY}px)`,
                            transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)"
                        }}
                    >
                        {/* 1. HEADER / DRAG HANDLE AREA */}
                        <div className="relative flex-shrink-0">
                            {/* Mobile Drag Handle */}
                            <div
                                onPointerDown={onPointerDown}
                                className="w-full h-[30px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                            >
                                {/* THEME COLOR: bg-border-default вместо хардкода */}
                                <div className="h-[5px] w-[48px] rounded-full bg-border-default" />
                            </div>

                            {/* Desktop Close Button */}
                            <div className="hidden md:block absolute top-5 right-5 z-20">
                                <Button
                                    type="button"
                                    onClick={close}
                                    style={{ minWidth: 0, color: 'var(--text-muted)' }}
                                >
                                    <IconWrapper style={{ padding: 8 }}>
                                        <Close />
                                    </IconWrapper>
                                </Button>
                            </div>
                        </div>

                        {/* 2. SCROLLABLE CONTENT AREA */}
                        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar px-4 pb-8 pt-2 md:p-8 md:pt-2">
                            {children}
                        </div>
                    </div>
                </div>
            </>,
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