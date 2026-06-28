export const playSound = (sound_path='/sounds/notification.mp3', volume=0.1) => {
    const audio = new Audio(sound_path);
    audio.volume = volume
    audio.play().catch(err => console.error("Ошибка воспроизведения звука:", err));
}