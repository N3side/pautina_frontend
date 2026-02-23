import {AnimatePresence, motion} from "framer-motion";
import {ReactNode, useMemo} from "react";

interface Props {
    children?: ReactNode
    position: number
    steps?: ReactNode[]
}

export default function Stepper({children, position, steps}: Props) {

    const form = useMemo(() => {

        return (
            steps && steps[position] || null
        )

    }, [position])

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