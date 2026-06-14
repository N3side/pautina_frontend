export const variants = {
    private: {
        bg: "bg-red-500/80"
    },
    public: {
        bg: "bg-green-500/80"
    }
}

interface Props {
    variant: string
    className?: string
}

export default function Status({ variant = "private", className }: Props) {
    return (
        <p
            className={`glass-effect text-secondary absolute top-3 left-3 text-text-main text-[10px] px-2 py-1 rounded-md uppercase font-bold ${variants[variant]?.bg} ${className}`}
        >
            {variant}
        </p>
    )
}