export default function StatCard({ title, count, icon: Icon, colorClass }: {
    title: string;
    count: number | undefined;
    icon: any;
    colorClass: string;
}) {
    return (
        <div className="relative overflow-hidden group flex items-center justify-between p-6 rounded-[24px] glass-effect transition-all duration-300 shadow-sm w-full">
            {/* Текст и цифры */}
            <div className="flex flex-col gap-2 z-10">
                <span className="text-text-muted text-sm font-medium tracking-wide">
                    {title}
                </span>
                <h3 className="text-text-main text-4xl font-bold leading-none tracking-tight">
                    {count !== undefined ? count.toLocaleString() : "..."}
                </h3>
            </div>

            {/* Иконка с мягким фоном */}
            <div className={`z-10 p-4 rounded-full bg-opacity-10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
                <Icon className="w-8 h-8" fontSize="inherit" />
            </div>

            {/* Декоративный блик на фоне при наведении */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 ${colorClass.replace('text-', 'bg-')}`}></div>
        </div>
    );
}