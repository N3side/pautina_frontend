interface Props {
    surname?: any
    name?: any
    patronymic?: any
}

export const fullName = (surname, name, patronymic) => {

    return [surname, name, patronymic]
        .filter(Boolean)
        .join(" ");
}