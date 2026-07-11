import { readDB } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { Mail, Phone, MapPin } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import HomePageContactForm from "@/components/HomePageContactForm";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const db = await readDB();
  const settings = db?.settings || {};
  const t = await getTranslations('Contact');

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <div className="bg-transparent text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-sky-500/20">
            {t('pageTag')}
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4 text-white">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* İletişim Bilgileri */}
            <div className="bg-slate-950/70 border border-white/10 backdrop-blur shadow-[0_35px_120px_rgba(2,132,199,0.15)] rounded-3xl p-8 flex flex-col gap-8 h-fit">
              <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('infoTitle')}</h2>
                  <div className="space-y-6">
                      {settings.email && (
                          <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                  <Mail className="w-6 h-6 text-sky-400" />
                              </div>
                              <div>
                                  <p className="text-sm font-semibold text-slate-400">{t('emailLabel')}</p>
                                  <a href={`mailto:${settings.email}`} className="text-lg font-medium text-slate-300 hover:text-sky-400 transition-colors">{settings.email}</a>
                              </div>
                          </div>
                      )}
                      
                      {settings.phone && (
                          <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                  <Phone className="w-6 h-6 text-sky-400" />
                              </div>
                              <div>
                                  <p className="text-sm font-semibold text-slate-400">{t('phoneLabel')}</p>
                                  <a href={`tel:${settings.phone}`} className="text-lg font-medium text-slate-300 hover:text-sky-400 transition-colors">{settings.phone}</a>
                              </div>
                          </div>
                      )}

                      <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-6 h-6 text-sky-400" />
                          </div>
                          <div>
                              <p className="text-sm font-semibold text-slate-400">{t('addressLabel')}</p>
                              <p className="text-base font-medium text-slate-300 mt-1">
                                  {t('addressText')}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{t('socialMedia')}</h3>
                  <div className="flex gap-3">
                      {settings.linkedinUrl && (
                          <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:bg-[#0A66C2] hover:text-white transition-all">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                      )}
                      {settings.twitterUrl && (
                          <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 hover:bg-black hover:text-white transition-all">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.965h-1.853z"/></svg>
                          </a>
                      )}
                  </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="lg:col-span-2 bg-slate-950/70 border border-white/10 backdrop-blur shadow-[0_35px_120px_rgba(2,132,199,0.15)] rounded-3xl p-8">
              <HomePageContactForm />
            </div>

        </div>

        {/* Google Harita */}
        <div className="mt-12 w-full h-[400px] bg-slate-950/70 border border-white/10 rounded-3xl overflow-hidden relative shadow-[0_35px_120px_rgba(2,132,199,0.15)]">
          <iframe 
              src="https://maps.google.com/maps?q=Enoca&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="invert hue-rotate-180 contrast-125 opacity-90 hover:opacity-100 transition-all duration-500"
          />
        </div>

      </div>
    </PublicLayout>
  );
}

