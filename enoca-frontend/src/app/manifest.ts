import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enoca Digital Agency',
    short_name: 'Enoca',
    description: 'Enoca Kurumsal Dijital Çözüm Merkezi',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0055FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Gerçek bir PWA için ileride 192x192 ve 512x512 PNG eklenebilir.
    ],
  };
}
