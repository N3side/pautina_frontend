import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host')?.split(':')[0]

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN
    const protocol = process.env.NEXT_PUBLIC_ROOT_PROTOCOL || 'https'

    if (!rootDomain) {
        return NextResponse.next()
    }

    if (url.pathname.startsWith('/_next/hmr') ||
        url.pathname.startsWith('/_next/webpack-hmr')) {
        return NextResponse.next()
    }

    if (
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    if (process.env.APP_ENV === "production") {
        try {
            const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/is_maintenance`;
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
                },
                cache: 'no-store'
            });

            const data = await res.json();
            const isMaintenance = data.result === "true"

            if (isMaintenance) {
                return NextResponse.rewrite(new URL('/maintenance', request.url));
            }

        } catch (error) {
            console.error("Ошибка проверки тех. работ:", error);
            return NextResponse.next();
        }
    }

    // Пропускаем основной домен
    if (!hostname || hostname === rootDomain || hostname.includes('localhost')) {
        return NextResponse.next()
    }

    const reservedSubdomains = ["blog", "event", "company"]

    const subdomain = hostname.split('.')[0]

    if (reservedSubdomains.includes(subdomain)) {
        return NextResponse.next()
    }

    if (url.pathname !== '/') {
        try {
            const mainDomainUrl = new URL(url.pathname, `${protocol}://${rootDomain}`)
            mainDomainUrl.search = url.search
            return NextResponse.redirect(mainDomainUrl)
        } catch (e) {
            console.error("URL Build Error:", e)
            return NextResponse.next()
        }
    }

    url.pathname = `/profile/${subdomain}`
    return NextResponse.rewrite(url)
}