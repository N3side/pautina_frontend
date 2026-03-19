export default function Card1({children}) {
    return (
        <section
            className="
                w-full lg:h-full h-[100vh] transition-all duration-300 px-[20px]
                flex flex-col items-start

                py-10 justify-start mt-0

                glass-effect

                lg:m-[auto] lg:my-[150px]
                lg:max-w-[650px] lg:rounded-[32px]
                lg:p-10 lg:py-10
            ">
            {children}
        </section>
    )
}