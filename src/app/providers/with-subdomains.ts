// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function WithSubdomains(req: NextRequest) {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get('host') || '';

    const currentEnvDomain = process.env.NODE_ENV === 'production'
        ? 'https://5fb5469c0f3e.vps.myjino.ru/backend/api/'
        : 'http://localhost:8876/api/';

    const subdomain = hostname.replace(`.${currentEnvDomain}`, '');

    // Если мы на главном домене — ничего не трогаем
    if (hostname === currentEnvDomain || subdomain === 'www' || subdomain === hostname) {
        return NextResponse.next();
    }

    // МАГИЯ ТУТ:
    // Если человек зашел на любой путь поддомена (например user1.localhost:3000/)
    // Мы принудительно отправляем его в /profile/user1
    // Очищаем старый pathname, чтобы не было /profile/user1/profile
    url.pathname = `/profile/${subdomain}`;

    console.log("REWRITING TO:", url.pathname); // Проверь это в консоли докера!
    return NextResponse.rewrite(url);
}

// Указываем, где middleware НЕ должен работать (картинки, апи и т.д.)
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};