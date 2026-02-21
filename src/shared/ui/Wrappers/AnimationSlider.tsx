import {AnimatePresence, motion} from "framer-motion";

export default function AnimationSlider({children, position}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={position} // Важно! При смене ключа срабатывает анимация
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}