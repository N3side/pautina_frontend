import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import CloseIcon from '@mui/icons-material/Close';
import {AnimatePresence, motion} from "framer-motion";
import {useRef} from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`

export default function Desktop({
        children,
        modalClassName = "",
        isOpen,
        close = () => {
        }
    }) {
    // Реф, чтобы запомнить, где началось нажатие
    const mouseDownTarget = useRef<EventTarget | null>(null);

    const handleOverlayMouseDown = (e: React.MouseEvent) => {
        mouseDownTarget.current = e.target;
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        // Закрываем только если нажали на оверлей И отпустили на оверлее
        if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) {
            close();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={cn(overlay, "flex justify-center items-center")}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    // Заменяем onClick на связкуMouseDown + Click
                    onMouseDown={handleOverlayMouseDown}
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className={cn(
                            "relative max-w-[900px] w-full max-h-[700px] h-full glass-effect rounded-2xl flex flex-col",
                            modalClassName
                        )}
                        initial={{opacity: 0, scale: 0.95, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: 20}}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        // Предотвращаем всплытие, чтобы клики внутри модалки не считались кликом по оверлею
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cn(content)}>
                            {children}
                        </div>

                        <motion.div
                            className="absolute right-[20px] top-[20px] rounded-[50%] cursor-pointer glass-effect p-2 aspect-square w-[40px] flex justify-center items-center z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                close();
                            }}
                            whileHover={{scale: 1.1, rotate: 90}}
                            whileTap={{scale: 0.9}}
                            transition={{type: "spring", stiffness: 400, damping: 17}}
                        >
                            <CloseIcon className="text-text-muted"/>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}