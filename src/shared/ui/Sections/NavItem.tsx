export function NavItem({ icon=null, label, active = false, badge }: { icon: React.ReactNode | null | undefined, label: string, active?: boolean, badge?: number }) {
    return (
        <a
            href="#"
            className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                ${active
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
        >
            <div className="flex items-center gap-3">
                <span className={`transition-colors ${active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {icon}
                </span>
                <span className="text-sm">{label}</span>
            </div>
            {badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {badge}
                </span>
            )}
        </a>
    );
}