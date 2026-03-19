
import toast from "react-hot-toast";

export const copyToClipboard = async ({text, message}: {text: string, message?: string}) => {
    // Пробуем современный API
    if (navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            message && toast.success(message);
            return;
        } catch (err) {
            console.warn('Clipboard API failed, trying fallback', err);
        }
    }

    // Fallback для старых браузеров и не-https
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Делаем элемент невидимым
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        // Пробуем execCommand (старый метод)
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            message && toast.success(message);
        } else {
            toast.error("Не удалось скопировать. Попробуйте выделить текст вручную");
        }
    } catch (err) {
        console.error('Fallback copy failed', err);
        toast.error("Не удалось скопировать ссылку");
    }
};