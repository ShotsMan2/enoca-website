// Kamu (public) sayfalar için Navbar + Footer sarmalayıcısı.
// Admin sayfaları bu bileşeni kullanmaz.
import Navbar from './Navbar';
import Footer from './Footer';
import { readDB } from '@/lib/db';
import { ContentPage } from '@/lib/admin-api';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const db = await readDB();
  const settings = db?.settings || {
    email: 'contact@enoca.com',
    phone: '+90 850 221 73 54',
    linkedinUrl: 'https://linkedin.com/company/enoca',
    twitterUrl: 'https://twitter.com/enoca_',
    privacyUrl: '/gizlilik',
    termsUrl: '/kullanim-kosullari',
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#050816_55%,_#060b1a_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      <Navbar settings={settings} pages={(db?.pages || []) as unknown as ContentPage[]} />
      <main className="relative z-10 flex-grow w-full">
        {children}
      </main>
      <Footer settings={settings} pages={(db?.pages || []) as unknown as ContentPage[]} />
    </div>
  );
}
