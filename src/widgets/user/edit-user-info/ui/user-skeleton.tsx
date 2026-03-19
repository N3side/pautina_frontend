export default function UserSkeleton() {
    return (
        <div className="relative w-full animate-pulse">
            {/* Имитация шапки (Header) */}
            <div className="left-0 absolute h-[230px] w-full glass-effect rounded-t-[18px] overflow-hidden bg-border-default/20"
                 style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />

            {/* Основная плашка профиля */}
            <div className={`w-full mt-[215px] relative glass-effect p-8 rounded-[18px] flex justify-between items-center flex-col lg:flex-row`}>

                {/* Внутрянка компонента User */}
                <div className="flex gap-20 items-center flex-col lg:flex-row w-full lg:w-auto">
                    {/* Аватар */}
                    <div className="w-[160px] h-[160px] !absolute !top-[-80px] rounded-full bg-border-default/50 border-4 border-surface shadow-lg" />

                    {/* Отступ под аватар */}
                    <div className="w-[160px] h-[70px]"></div>

                    {/* Текстовая инфа */}
                    <div className="relative flex flex-col gap-3 items-center lg:items-start w-full">
                        {/* Имя */}
                        <div className="h-7 w-48 bg-border-default/60 rounded-lg" />

                        {/* Теги/Контакты */}
                        <div className="flex gap-4 mt-1">
                            <div className="h-5 w-24 bg-border-default/40 rounded-md" />
                            <div className="h-5 w-32 bg-border-default/40 rounded-md" />
                            <div className="h-5 w-20 bg-border-default/40 rounded-md hidden md:block" />
                        </div>
                    </div>
                </div>

                {/* Кнопки справа */}
                <div className="hidden lg:flex gap-2">
                    <div className="h-10 w-40 bg-border-default/50 rounded-[12px]" />
                    <div className="h-10 w-28 bg-border-default/50 rounded-[12px]" />
                </div>
            </div>
        </div>
    );
}