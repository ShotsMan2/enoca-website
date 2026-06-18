import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/HeroVisual";
import PublicLayout from "@/components/PublicLayout";
import { getTranslations } from "next-intl/server";

// Kategorileri ve linkleri dinamik alıyoruz
async function getCategories() {
  try {
    const res = await fetch("http://localhost:3000/categories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();
  const t = await getTranslations('Hero');

  // Sabit referans listesi (siteden alınan)
  const references = [
    "Adese", "AGT", "Avansas", "Carrefour", "EAE", "Ebebek", 
    "G2M", "Gratis", "Hasçelik", "İpragaz", "İGA", "Koton", 
    "LC Waikiki", "Nitori", "Penti", "Teknosa", "Turkcell", "Türk Telekom"
  ];

  return (
    <PublicLayout>
      {/* 1. KAHRAMAN BÖLÜMÜ (HERO) */}
      <section className="relative overflow-hidden pt-4 pb-20 lg:pt-6 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
                  ENOCA™ TEKNOLOJİ
                </span>
              </div>

              <h1 className="text-[3.5rem] leading-[1.05] sm:text-[4rem] lg:text-[5rem] font-black tracking-tighter text-foreground mb-4 font-display">
                {t('title1')} <br className="hidden sm:block" />
                <span className="text-accent relative inline-block">
                  {t('titleHighlight')}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground/60 max-w-lg leading-relaxed font-medium">
                {t('subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-sm font-bold tracking-widest bg-accent hover:bg-accent/90 text-white rounded-xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1">
                  {t('btnPrimary')}
                </Button>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-sm font-bold tracking-widest border-2 border-border/50 hover:bg-accent/5 hover:border-accent hover:text-accent rounded-xl transition-all duration-300">
                  {t('btnSecondary')}
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. ÇÖZÜMLER & YETKİNLİKLER (Inverted Contrast) */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-xl font-bold font-mono">01</span>
              </div>
              <h3 className="text-xl font-bold text-white">GELECEĞİN TİCARETİ</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Özellikle bilişim alanında teknolojideki gelişmeler hızlıca şekillenmeye devam ediyor. Gün geçtikçe daha fazla insan bu gelişmelerden faydalanmaya başlıyor.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-xl font-bold font-mono">02</span>
              </div>
              <h3 className="text-xl font-bold text-white">ÇOKLU TİCARET</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                SAP CX Hybris ile her yerde ticaret yapın. SAP CX Hybris Çoklu Ticaret Platformu çok kanallı, sağlam, üst düzey ölçeklenebilir bir yapı sunar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-xl font-bold font-mono">03</span>
              </div>
              <h3 className="text-xl font-bold text-white">ÇEVİK OLUN</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "Çevik Geliştirme" birçok tekrarlı ve ilerleyen yazılım geliştirme metodları için birleştiricidir. Hız ve kaliteyi aynı anda yakalayın.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-xl font-bold font-mono">04</span>
              </div>
              <h3 className="text-xl font-bold text-white">SİSTEM SAĞLIĞI</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sisteminizin düşük performansından hiç şikayet ettiniz mi? Bir sisteme çok para harcamak, doğrudan beklenen performansı sağlamaz. İzleme şarttır.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. REFERANSLAR (Yeni Eklenen Alan) */}
      <section className="py-20 border-b border-border bg-background overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
             <h3 className="text-sm font-mono tracking-[0.2em] text-muted-foreground uppercase">GÜÇLÜ REFERANSLARIMIZ</h3>
         </div>
         {/* Basit text-based marquee / grid simulasyonu */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {references.map((ref, idx) => (
                    <span key={idx} className="text-xl md:text-2xl font-bold font-display text-foreground">
                        {ref}
                    </span>
                ))}
            </div>
         </div>
      </section>

      {/* 4. DİNAMİK KATEGORİLER (Backend'den Gelen Alan) */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display text-foreground">
              Hizmetlerimiz & <span className="gradient-text">Çözümler</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Aşağıdaki yapı NestJS backend servisimizden anlık olarak beslenmektedir.
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat: any) => (
                <div key={cat.id} className="group relative bg-card rounded-2xl border border-border p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold">→</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 uppercase">{cat.name}</h3>
                  <div className="flex flex-col gap-3 mb-6">
                    {cat.links?.map((link: any) => (
                      <Link 
                        key={link.id} 
                        href={link.url}
                        className="text-muted-foreground hover:text-accent font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent/50" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed border-border rounded-2xl bg-muted/30">
              <p className="text-muted-foreground">NestJS sunucusundan veri çekilemedi. Lütfen backend'i kontrol edin.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. İLETİŞİM / CTA BÖLÜMÜ */}
      <section className="py-24 relative bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-accent-lg relative overflow-hidden">
             
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                  Bize Ulaşın
                </h2>
                <p className="text-muted-foreground">
                  Projeleriniz için danışmanlık hizmeti almak veya çözümlerimiz hakkında bilgi edinmek için formu doldurun.
                </p>
            </div>
            
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                       <label className="text-sm font-medium text-foreground">Ad Soyad *</label>
                       <input 
                          type="text" 
                          required 
                          placeholder="Adınız Soyadınız" 
                          className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                       />
                   </div>
                   <div className="space-y-2">
                       <label className="text-sm font-medium text-foreground">Email *</label>
                       <input 
                          type="email" 
                          required 
                          placeholder="Mail adresiniz" 
                          className="w-full h-12 px-4 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                       />
                   </div>
               </div>
               <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">Yorum veya Mesaj *</label>
                   <textarea 
                      required 
                      rows={4}
                      placeholder="Mesajınız..." 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                   ></textarea>
               </div>
               <div className="pt-2 text-center">
                   <Button size="lg" className="px-12 w-full md:w-auto">Gönder</Button>
               </div>
            </form>

          </div>
        </div>
      </section>

    </PublicLayout>
  );
}