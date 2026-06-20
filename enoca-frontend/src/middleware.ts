import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin rotalarını koru
  if (pathname.startsWith('/admin')) {
    // Login sayfasına gidiyorsa izin ver
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Diğer admin rotaları için cookie kontrolü
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
      // Session yoksa login'e at
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Geçerli session varsa devam et
    return NextResponse.next();
  }

  // Admin harici rotalar için next-intl çalıştır
  return intlMiddleware(request);
}

export const config = {
  // Bütün rotalar (API ve statikler hariç) middleware'den geçmeli
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
