import {motion} from "framer-motion";
import {useTheme} from "@/shared/lib/providers/ThemeProvider";

export default function ProgressBar({progress}) {

    const {theme} = useTheme()

    return (
        <div className={`w-full h-1.5 rounded-full mb-8 bg-${ theme === "light" ? "text-main" : "text-muted" } relative`}>
            <motion.div
                className="h-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    background: "var(--color-brand)",
                    backgroundSize: '200% 100%', // Растягиваем, чтобы было куда двигать блик
                }}
            >
                {/* Анимированный слой с блеском */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundPosition: ['200% 0%', '-200% 0%'],
                    }}
                    transition={{
                        duration: 3, // Скорость блеска (3 секунды)
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: `linear-gradient(
                                    90deg, 
                                    transparent, 
                                    rgba(255,255,255,0.3), 
                                    transparent
                                )`,
                        backgroundSize: '50% 100%',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </motion.div>
        </div>
    )
}