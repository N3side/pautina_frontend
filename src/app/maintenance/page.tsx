export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* Задний фон: Эффект глубокого неонового свечения (Ambient Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/[0.08] blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-12 left-12 w-72 h-72 bg-indigo-500/[0.03] blur-[80px] rounded-full pointer-events-none z-0" />

            {/* Основная карточка с продвинутым эффектом стекла */}
            <div className="glass-effect max-w-lg w-full px-6 py-10 rounded-[32px] flex flex-col items-center text-center relative z-10">

                {/* Иконка шестеренки с мягкой подложкой и свечением */}
                <div className="relative mb-8 group glass-effect rounded-2xl">
                    <div className="absolute inset-0  blur-xl rounded-2xl scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative w-20 h-20  rounded-2xl flex items-center justify-center text-blue-400 shadow-lg">
                        <svg className="w-10 h-10 animate-[spin_8s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                {/* Заголовок с легким металлическим градиентом */}
                <h3 className="text-text-main text-3xl font-extrabold tracking-tight mb-4">
                    Технический перерыв
                </h3>

                <p className="text-text-muted leading-relaxed font-medium px-3">
                    Прямо сейчас мы проводим плановые работы по улучшению платформы.
                    Пожалуйста, загляните к нам чуть позже. Приносим извинения за временные неудобства!
                </p>
            </div>
        </div>
    );
}