interface Props {
    tag?: string
    color?: string
    onRemove?: (args?: any) => void
}

export default function Tag({tag="", color="#6366f1", onRemove}: Props) {
    return (
        <span className="w-fit px-3 py-1 rounded-full inline-flex items-center gap-1 group " style={{background: `${color}10`, border: `1px solid ${color}20`}}>
            <p className="text-tiny font-bold" style={{color: color}}>
                {tag}
            </p>
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="rounded-full hover:bg-black/5 p-0.5 transition-all duration-300 hover:rotate-90"
                    style={{background: color}}
                    type="button"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </span>
    )
}