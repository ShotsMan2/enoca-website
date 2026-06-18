import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Yalnızca public sayfalar ve locale rotaları i18n middleware'ine girer.
  // /admin ve apiler, ayrıca _next/static, görseller vb. atlanır.
  matcher: ['/', '/(tr|en)/:path*', '/((?!admin|api|_next|_vercel|.*\\..*).*)']
};
