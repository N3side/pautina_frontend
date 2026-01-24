export default function Card1({children}) {
    return (
        <section
            className="
            w-full bg-white transition-all duration-300
            flex flex-col items-center
            /* Мобильная версия: на весь экран */
            min-h-screen px-6 py-10 justify-start
            /* Десктопная версия: карточка */
            lg: m-[auto]
            lg:min-h-fit lg:max-w-[650px] lg:rounded-[32px]
            lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            lg:border lg:border-gray-100 lg:p-10 lg:py-10
        ">
            {children}
        </section>
    )
}