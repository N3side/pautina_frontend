export const fullName = (user) => {

    if (!user) return

    return [user.main?.surname, user.main?.name, user.main?.patronymic]
        .filter(Boolean)
        .join(" ");
}

