import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
    handlers: Record<string, any>
}

export default function SkipButton({handlers}: Props) {
    return (
        <AnimatePresence>
            <motion.div
                key="skip-button"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="fixed right-[4%] bottom-[4%] z-50"
            >
                <Button
                    onClick={handlers?.next}
                    // Стилизация кнопки
                    className={`
                                !rounded-2xl !px-5 !py-3 !normal-case
                                !text-slate-600 dark:!text-slate-300
                                hover:glass-effect
                                hover:!scale-[1.02] 
                                active:!scale-[0.98]
                                !transition-all !duration-300
                                flex gap-2 items-center
                            `}
                >
                    <p
                        className="text-tiny font-medium opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                        Пропустить
                    </p>

                    <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            repeatDelay: 1,
                            ease: "easeInOut"
                        }}
                    >
                        <ChevronRightIcon className="!w-5 !h-5 opacity-70" />
                    </motion.div>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}