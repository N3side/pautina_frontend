const injectNotifyStyles = (): void => {
    if (document.getElementById('shared-notify-styles')) return;

    const style = document.createElement('style');
    style.id = 'shared-notify-styles';
    style.textContent = `
    
    .notify {
        position: fixed;
        top: 24px;
        right: 24px;
        max-width: 356px;
        max-height: 56px;
        width: 100%;
        height: 100%;
        padding: 14px 24px;
        background: #8d79f2;
        color: white;
        font-weight: 500;
        border-radius: 10px;
        font-size: 14px;
        line-height: 1.4;
        z-index: 10000;
        opacity: 0;
        transform: translateX(120%);
        transition: transform 0.3s cubic-bezier(0.22, 0, 0, 1), opacity 0.3s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .notify.active {
      opacity: 1;
      transform: translateX(0);
    }
  `;
    document.head.appendChild(style);
};

export const notify = (msg: string): void => {

    injectNotifyStyles()

    const id: number = Math.random() * Math.random()

    const notify = document.createElement("div")
    notify.id = `${id}`
    notify.className = "notify"
    notify.textContent = msg

    document.body.appendChild(notify)

    void notify.offsetWidth

    requestAnimationFrame((): void => {
        notify.classList.add('active')
    })

    setTimeout(() => {
        notify.classList.remove("active")
        setTimeout(() => {
            notify.remove()
        }, 300)
    }, 4700)

}