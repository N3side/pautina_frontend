import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host')?.split(':')[0]

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN
    const protocol = process.env.NEXT_PUBLIC_ROOT_PROTOCOL || 'https'

    console.log(`Middleware Debug: host=${hostname}, root=${rootDomain}`);

    if (!rootDomain) {
        return NextResponse.next()
    }

    // Для Turbopack HMR (Next.js 16)
    if (url.pathname.startsWith('/_next/hmr') ||
        url.pathname.startsWith('/_next/webpack-hmr')) {
        console.log('✅ HMR request passed through')
        return NextResponse.next()
    }

    // Пропускаем основной домен
    if (!hostname || hostname === rootDomain || hostname.includes('localhost')) {
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