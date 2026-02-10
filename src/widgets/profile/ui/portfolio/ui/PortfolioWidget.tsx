import Book from "@/shared/assets/images/vector/Book"; // Убедись, что иконка поддерживает className или цвет через fill/stroke
import {Button} from "@mui/material";
import {CardProps, cards, categories, CategoriesProps} from "@/widgets/profile/ui/portfolio/model";
import Card from "@/widgets/profile/ui/portfolio/ui/Card";
import {WheelXScrollProvider} from "@/shared/ui/wrappers/WheelScrollXWrapper";
import {useModal} from "@/shared/ui/Modals/Modal";
import {AchievementWidget} from "@/widgets/profile/ui/portfolio/ui/AchievementWidget";

export default function PortfolioWidget() {
    const { modal, open } = useModal({ children: <AchievementWidget /> });

    return (
        <section className="flex flex-col gap-8 mt-10 w-full">

            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h4 className="text-text-main font-bold tracking-tight">
                        Портфолио
                    </h4>

                    <p className="text-secondary text-text-muted">
                        Достижения, сертификаты и проекты
                    </p>
                </div>

                <Button
                    variant="contained"
                    disableElevation
                    className="
                        !bg-brand hover:!bg-brand-hover
                        !text-white !font-medium !rounded-xl
                        !py-2.5 !px-5 !shadow-lg !shadow-brand/25
                        hover:!shadow-brand/40 !transition-all !normal-case
                        w-full md:w-auto flex items-center gap-2
                    "
                    onClick={() => {}} // Добавь обработчик, если есть
                >
                    {/* Если Book это SVG компонент, можно добавить класс для цвета, если нужно */}
                    <div className="w-5 h-5 flex items-center justify-center">
                        <Book />
                    </div>
                    <span>Добавить документ</span>
                </Button>
            </header>

            <main className="flex flex-col gap-8">

                {/* --- CATEGORIES (Chips) --- */}
                {/* Добавил -mx-4 px-4, чтобы на мобилках скролл уходил за край экрана красиво */}
                <div className="-mx-4 px-4 md:mx-0 md:px-0">
                    <WheelXScrollProvider>
                        <ul className="flex items-center gap-3 py-2">
                            {categories?.map((category: CategoriesProps, i) => (
                                <li
                                    key={i}
                                    className="
                                        group flex items-center gap-2.5
                                        py-2 px-4 rounded-full
                                        glass-effect border border-border-default
                                        cursor-pointer select-none
                                        transition-all duration-300
                                        hover:border-brand/50 hover:shadow-md hover:-translate-y-0.5
                                        active:scale-95
                                    "
                                >
                                    <p
                                        className="text-small font-medium text-text-main group-hover:text-brand transition-colors whitespace-nowrap"
                                    >
                                        {category.text}
                                    </p>

                                    {/* Badge с количеством */}
                                    <div className="flex items-center justify-center px-2 py-0.5 rounded-full group-hover:bg-brand/10 transition-colors">
                                        <p
                                            className="text-tiny font-bold text-text-muted group-hover:text-brand transition-colors"
                                        >
                                            {category.count}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </WheelXScrollProvider>
                </div>

                {/* --- CARDS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cards?.map((card: CardProps, i) => (
                        // Обертка для анимации появления (опционально)
                        <div key={i} className="h-full">
                            <Card
                                image={card.image}
                                date={card.date}
                                category={card.category}
                                type={card.category}
                                title={card.title}
                                onClick={open}
                                // Если Card принимает className, можно добавить hover эффекты снаружи
                            />
                        </div>
                    ))}

                    {/* Empty State (на случай если карт нет) */}
                    {(!cards || cards.length === 0) && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border-default rounded-2xl bg-surface/50">
                            <p className="text-secondary text-text-muted mb-4">
                                Пока нет добавленных проектов
                            </p>
                            <Button
                                variant="text"
                                className="!text-brand !normal-case"
                            >
                                Добавить первый проект
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            {modal}
        </section>
    );
}