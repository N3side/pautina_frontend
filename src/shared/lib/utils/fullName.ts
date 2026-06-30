interface Props {
    surname?: string
    name?: string
    patronymic?: string
}

export const fullName = (surname="", name="", patronymic="") => {

    return [surname, name, patronymic]
        .filter(Boolean)
        .join(" ");
}