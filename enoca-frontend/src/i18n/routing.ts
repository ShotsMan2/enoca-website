import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // Desteklenen diller
  locales: ['tr', 'en'],
 
  // Varsayılan dil (URL'de dil yoksa yönlendirilecek)
  defaultLocale: 'tr'
});
 
// next-intl'ın sayfalar arası geçişlerde kullanılacak sarmalayıcıları
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
