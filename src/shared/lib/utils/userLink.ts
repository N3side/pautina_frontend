export const userLink = (sub) => {
    return `${process.env.NEXT_PUBLIC_ROOT_PROTOCOL}://${sub}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
}

export const userLinkWithoutProtocol = (sub) => {
    return `${sub}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
}

export const homeLink = `${process.env.NEXT_PUBLIC_ROOT_PROTOCOL}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`