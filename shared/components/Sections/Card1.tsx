export default function Card1({children}) {
    return (
        <section
            className="
            w-full transition-all duration-300 px-[20px]
            flex flex-col items-start bg-transparent
            /* Мобильная версия: на весь экран */
            min-h-screen py-10 justify-start mt-0
            lg:bg-surface
            /* Десктопная версия: карточка */
            lg: m-[auto] lg:mt-[50px]
            lg:min-h-fit lg:max-w-[650px] lg:rounded-[32px]
            lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            lg:p-10 lg:py-10
        ">
            {children}
        </section>
    )
}