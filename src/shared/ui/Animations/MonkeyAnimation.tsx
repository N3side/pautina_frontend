'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface MonkeyAnimationProps {
    type: 'peek' | 'close';
    width?: number;
    height?: number;
}

export default function MonkeyAnimation({ type, width = 160, height = 160 }: MonkeyAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const rafRef = useRef<number | null>(null);

    // Очистка при полном удалении компонента
    useEffect(() => {
        return () => {
            animationRef.current?.destroy();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        let isCancelled = false;
        // Всегда загружаем анимацию peek, так как close — это её обратное воспроизведение
        const animationFile = '../../assets/animations/password_peek.json';

        import(`${animationFile}`)
            .then((animationData) => {
                if (isCancelled) return;

                // Уничтожаем предыдущую инстанцию перед созданием новой
                if (animationRef.current) {
                    animationRef.current.destroy();
                    animationRef.current = null;
                }

                const anim = lottie.loadAnimation({
                    container: containerRef.current!,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false, // Важно: управляем вручную
                    animationData: animationData.default || animationData,
                });

                animationRef.current = anim;

                // Функция для плавного покадрового контроля
                const animateFrame = (startFrame: number, endFrame: number, direction: 'forward' | 'backward') => {
                    if (isCancelled || !anim) return;

                    // Устанавливаем начальный кадр мгновенно
                    anim.goToAndStop(startFrame, true);

                    const step = () => {
                        if (isCancelled || !anim) return;

                        const current = anim.currentFrame;

                        // Проверка достижения целевого кадра с небольшим допуском
                        if (direction === 'forward') {
                            if (current >= endFrame) {
                                anim.goToAndStop(endFrame, true);
                                return;
                            }
                            // Продвигаемся вперед (можно изменить шаг для скорости)
                            anim.goToAndStop(current + 1, true);
                        } else {
                            if (current <= endFrame) {
                                anim.goToAndStop(endFrame, true);
                                return;
                            }
                            // Идем назад
                            anim.goToAndStop(current - 1, true);
                        }

                        rafRef.current = requestAnimationFrame(step);
                    };

                    // Запускаем цикл
                    rafRef.current = requestAnimationFrame(step);
                };

                if (type === 'peek') {
                    // Вперед: 0 -> 11
                    animateFrame(0, 11, 'forward');
                } else {
                    // Назад: 11 -> 0
                    animateFrame(11, 0, 'backward');
                }
            })
            .catch(err => console.error("Ошибка загрузки анимации:", err));

        return () => {
            isCancelled = true;
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [type]);

    return <div ref={containerRef} style={{ width, height }} />;
}