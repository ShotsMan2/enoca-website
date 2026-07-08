// Kamu (public) sayfalar için Navbar + Footer sarmalayıcısı.
// Admin sayfaları bu bileşeni kullanmaz.
import Navbar from './Navbar';
import Footer from './Footer';
import { readDB } from '@/lib/db';
import { ContentPage } from '@/lib/admin-api';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const db = await readDB();
  const settings = db?.settings || {
    email: "contact@enoca.com", phone: "+90 850 221 73 54", 
    linkedinUrl: "https://linkedin.com/company/enoca", twitterUrl: "https://twitter.com/enoca_", 
    privacyUrl: "/gizlilik", termsUrl: "/kullanim-kosullari"
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-clip">
      <Navbar settings={settings} pages={(db?.pages || []) as unknown as ContentPage[]} />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer settings={settings} pages={(db?.pages || []) as unknown as ContentPage[]} />
    </div>
  );
}
