import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function LinkSetting({feature="", description="", ...props}) {
    return (
        <div className="flex items-center justify-between rounded-xl hover:border-brand transition-colors group cursor-pointer" {...props}>
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                    {feature && <span className="text-secondary font-semibold text-text-muted">{feature}</span>}
                    {description && <p className="text-small text-text-muted text-small">
                        {description}
                    </p>}
                </div>
            </div>

            <ChevronRightIcon className="text-text-muted" />

        </div>
    )
}