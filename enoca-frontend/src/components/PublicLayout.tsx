// Kamu (public) sayfalar için Navbar + Footer sarmalayıcısı.
// Admin sayfaları bu bileşeni kullanmaz.
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
