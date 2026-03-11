import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import CloseIcon from '@mui/icons-material/Close';
import {AnimatePresence, motion} from "framer-motion";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`

export default function Desktop({
        children,
        modalClassName = "",
        isOpen,
        close = () => {}
    }) {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={cn(overlay, "flex justify-center items-center")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => close()}
                >
                    <motion.div
                        className={cn(
                            "relative max-w-[900px] w-full max-h-[700px] h-full glass-effect rounded-2xl",
                            modalClassName
                        )}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cn(content)}>
                            {children}
                        </div>

                        <motion.div
                            className="absolute right-[20px] top-[20px] rounded-[50%] cursor-pointer glass-effect p-2 aspect-square w-[40px] flex justify-center align-center z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                close();
                            }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <CloseIcon className="text-text-muted" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}