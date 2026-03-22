export const playSound = () => {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.1
    audio.play().catch(err => console.error("Ошибка воспроизведения звука:", err));
}