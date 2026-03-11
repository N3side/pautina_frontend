interface Props {
    category: Record<string, any>,
    [key: string]: any
}

export default function Category({category, ...props}: Props) {
    return (
        <li
            className="
                group flex items-center gap-2.5
                py-2 px-4 rounded-full
                glass-effect border border-border-default
                cursor-pointer select-none
                transition-all duration-300
                hover:border-brand/50 hover:shadow-md hover:-translate-y-0.5
                active:scale-95
            "
            {...props}
        >
            <p
                className="text-small font-medium text-text-main group-hover:text-brand transition-colors whitespace-nowrap"
            >
                {category.name}
            </p>

            {category?.count && (
                <div className="flex items-center justify-center px-2 py-0.5 rounded-full group-hover:bg-brand/10 transition-colors">
                    <p
                        className="text-tiny font-bold text-text-muted group-hover:text-brand transition-colors"
                    >
                        {category.count}
                    </p>
                </div>
            )}

        </li>
    )
}