export default function Card1({children}) {
    return (
        <section
            style={{
                transform: "translateX(50%) translateY(-50%)"
            }}
            className="
                absolute top-[50%] right-[50%]
                w-full transition-all duration-300 px-[20px]
                flex flex-col items-start bg-transparent

                py-10 justify-start mt-0

                glass-effect

                lg:m-[auto] lg:mt-[50px]
                lg:min-h-fit lg:max-w-[650px] lg:rounded-[32px]
                lg:p-10 lg:py-10
            ">
            {children}
        </section>
    )
}