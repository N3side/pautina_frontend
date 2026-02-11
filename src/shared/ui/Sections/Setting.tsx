export default function Setting({Switch, feature="", description=""}) {
    return (
        <div className="flex items-center justify-between rounded-xl hover:border-brand transition-colors group">
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-secondary font-semibold text-text-muted">{feature}</span>
                    <p className="text-small text-text-muted text-sm">
                        {description}
                    </p>
                </div>
            </div>

            {Switch}

        </div>
    )
}