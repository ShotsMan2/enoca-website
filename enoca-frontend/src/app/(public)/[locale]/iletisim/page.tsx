import { readDB } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { Mail, Phone, MapPin } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import HomePageContactForm from "@/components/HomePageContactForm";

export default async function ContactPage() {
  const db = await readDB();
  const settings = db?.settings || {};

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        {/* Hero Banner */}
        <div className="bg-blue-600 dark:bg-blue-900 text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -z-0" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4">
                    İletişime Geçin
                </h1>
                <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
                    Projeleriniz, danışmanlık talepleriniz veya sorularınız için bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan memnuniyet duyarız.
                </p>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* İletişim Bilgileri */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-8 h-fit">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">İletişim Bilgileri</h2>
                    <div className="space-y-6">
                        {settings.email && (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">E-Posta</p>
                                    <a href={`mailto:${settings.email}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">{settings.email}</a>
                                </div>
                            </div>
                        )}
                        
                        {settings.phone && (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Telefon</p>
                                    <a href={`tel:${settings.phone}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">{settings.phone}</a>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Genel Merkez</p>
                                <p className="text-base font-bold text-gray-900 dark:text-white mt-1">
                                    Bilişim Vadisi, Teknoloji Geliştirme Bölgesi, Kocaeli, Türkiye
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Sosyal Medya</h3>
                    <div className="flex gap-3">
                        {settings.linkedinUrl && (
                            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        )}
                        {settings.twitterUrl && (
                            <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                        )}
                    </div>
                </div>
              </div>

              {/* İletişim Formu */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <HomePageContactForm />
              </div>

          </div>

          {/* Google Harita (Opsiyonel Dekoratif) */}
          <div className="mt-12 w-full h-[400px] bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden relative shadow-inner">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.9205561042784!2d29.4316127!3d40.8735391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad1fa46271a09%3A0xb30cf3b08e7ff1b1!2zQmlsacWfaW0gVmFkaXNp!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
            />
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
