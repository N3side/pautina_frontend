interface Props {
    user: Record<string, any> | null
}

export const HasUserSubscription = ({user}: Props)=>  {
    return user?.access?.subscription?.id > 1
}