const handleRedirect = (username: string) => {
    // На локалке
    window.location.href = `http://${username}.localhost:3000`;

    // На проде (через переменную окружения)
    // window.location.href = `https://${username}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
};