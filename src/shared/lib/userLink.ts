export const userLink = (sub) => {
    return `${process.env.NEXT_PUBLIC_ROOT_PROTOCOL}://${sub}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
}