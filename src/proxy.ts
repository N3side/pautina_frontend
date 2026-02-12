import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host')

    // Пропускаем основной домен
    if (!hostname || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN || hostname.includes('localhost')) {
        return NextResponse.next()
    }

    // Пропускаем статику и API
    if (
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const subdomain = hostname.split('.')[0]

    // ЛОГИКА РЕДИРЕКТА:
    // Если путь НЕ пустой и НЕ "/", значит юзер ввел что-то вроде /login
    if (url.pathname !== '/') {
        // Создаем URL для редиректа на основной домен
        const mainDomainUrl = new URL(url.pathname, `${process.env.NEXT_PUBLIC_ROOT_PROTOCOL}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
        // Добавляем query параметры, если они были
        mainDomainUrl.search = url.search

        return NextResponse.redirect(mainDomainUrl)
    }

    // Если мы здесь, значит путь "/" — делаем rewrite на профиль
    url.pathname = `/profile/${subdomain}`

    return NextResponse.rewrite(url)
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}