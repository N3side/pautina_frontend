
interface Props {
    className?: string
    limit: number
    callback: () => any
}

export default function RecognizeButton({className, limit, callback}: Props) {
    return (
        <div
            className={`
                relative z-[100]
                w-[calc(100vw-2rem)] max-w-[500px]
                flex items-center justify-between
                p-4
                rounded-2xl
                backdrop-blur-2xl
                border-2 border-brand/40
                shadow-[0_20px_50px_rgba(var(--brand-rgb),0.3)]
                hover:border-brand hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-300
                group
                overflow-hidden
                ${className}
            `}
            onClick={(e) => {
                e.preventDefault()
                callback()
            }}
        >
            {/* Эффект сканирующего блика (пролетает при наведении) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>

            <div className="relative z-10 flex items-center gap-4">
                {/* Иконка с пульсацией */}
                <div
                    className="p-2.5 rounded-xl bg-brand/20 text-brand shadow-[inset_0_0_10px_rgba(var(--brand-rgb),0.2)]">
                    <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M11.5,2L9,6.5L4.5,9L9,11.5L11.5,16L14,11.5L18.5,9L14,6.5L11.5,2M11.5,18L10.25,20.25L8,21.5L10.25,22.75L11.5,25L12.75,22.75L15,21.5L12.75,20.25L11.5,18M19,14L17.75,16.25L15.5,17.5L17.75,18.75L19,21L20.25,18.75L22.5,17.5L20.25,16.25L19,14Z"/>
                    </svg>
                </div>

                <div className="flex flex-col items-start leading-tight">
                    <p className="font-bold text-text-main text-base group-hover:text-brand transition-colors">
                        Авто-заполнение
                    </p>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-end gap-1.5">
                    <span
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-brand text-white font-black uppercase tracking-wider shadow-lg shadow-brand/40">
                        BETA
                    </span>
                <span className="text-[11px] text-text-muted">
                    Лимит: <b className="text-text-main font-mono">{limit}</b>
                </span>
            </div>

        </div>
    )
}