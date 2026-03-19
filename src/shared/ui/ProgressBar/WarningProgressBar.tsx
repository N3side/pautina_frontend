import {motion} from "framer-motion";
import {useTheme} from "next-themes";
import {useMemo} from "react";

export default function ProgressBar({progress}) {
    const {theme} = useTheme()

    // Вычисляем цвет в зависимости от прогресса
    const fillColor = useMemo(() => {
        // Начальный цвет (var(--color-brand)) - синий/фиолетовый
        // Конечный цвет - красный
        // Плавно интерполируем между ними

        // Прогресс от 0 до 100 преобразуем в значение от 0 до 1
        const t = progress / 100;

        // Для красного цвета используем rgb(255, 0, 0)
        // Для начального цвета из переменной --color-brand (rgb(79, 70, 229) для фиолетового)
        const startColor = {r: 79, g: 70, b: 229}; // --color-brand (индиго)
        const endColor = {r: 255, g: 0, b: 0}; // красный

        // Интерполяция
        const r = Math.round(startColor.r + (endColor.r - startColor.r) * t);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * t);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * t);

        return `rgb(${r}, ${g}, ${b})`;
    }, [progress]);

    return (
        <div className={`w-full h-1.5 rounded-full mb-8 bg-${ theme === "light" ? "text-main" : "text-muted" } relative`}>
            <motion.div
                className="h-full relative overflow-hidden rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    background: fillColor,
                    backgroundSize: '200% 100%',
                    transition: 'background-color 0.3s ease' // Плавное изменение цвета
                }}
            >
                {/* Анимированный слой с блеском */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundPosition: ['200% 0%', '-200% 0%'],
                    }}
                    transition={{
                        duration: 3,
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