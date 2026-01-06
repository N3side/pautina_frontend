interface categoriesProps {
    text?: string
    count?: string
}

const categories: categoriesProps[] = [
    {
        text: "Все",
        count: "5"
    },
    {
        text: "Обучение",
        count: "3"
    },
    {
        text: "Достижения",
        count: "1"
    },
    {
        text: "Благодарности",
        count: "1"
    }
]

interface cardProps {
    image?: string
    date?: string
    title?: string
    category?: string
    type?: string
    onClick?: () => void
}

const cards: cardProps[] = [
    {
        category: "Обучение",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp",
        date: "Ноябрь 2024",
        title: "ППК. Введение в алгоритмы: реализация на языке Python",
        type: "Удостоверение"
    },
    {
        category: "Обучение",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp",
        date: "Ноябрь 2024",
        title: "ППК. Введение в алгоритмы: реализация на языке Python",
        type: "Удостоверение"
    },
    {
        category: "Обучение",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp",
        date: "Ноябрь 2024",
        title: "ППК. Введение в алгоритмы: реализация на языке Python",
        type: "Удостоверение"
    },
    {
        category: "Обучение",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp",
        date: "Ноябрь 2024",
        title: "ППК. Введение в алгоритмы: реализация на языке Python",
        type: "Удостоверение"
    },
    {
        category: "Обучение",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp",
        date: "Ноябрь 2024",
        title: "ППК. Введение в алгоритмы: реализация на языке Python",
        type: "Удостоверение"
    },
]

export {categories, categoriesProps, cards, cardProps}