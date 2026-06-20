"use client";

import { useState, useEffect } from "react";
import { Settings, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true, // Her zaman açık
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-advanced");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 0);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setTimeout(() => setPreferences(parsed), 0);
      } catch {
        // unused catch param removed
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allOn = { necessary: true, analytics: true, marketing: true };
    setPreferences(allOn);
    localStorage.setItem("cookie-consent-advanced", JSON.stringify(allOn));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookie-consent-advanced", JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Basit Banner (Eğer ayar yapılmadıysa) */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <div className="max-w-5xl mx-auto bg-card border border-border shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">Gizlilik ve Çerez Politikası</h3>
              <p className="text-sm text-muted-foreground">
                Sitemizde size en iyi deneyimi sunabilmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler kullanıyoruz. 
                Tüm çerezleri kabul edebilir veya &quot;Ayarlar&quot; butonuna tıklayarak tercihlerinizi yönetebilirsiniz.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowSettings(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-foreground bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Ayarlar
              </button>
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-accent hover:bg-accent/90 transition-colors shadow-accent"
              >
                Tümünü Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gelişmiş Ayar Modalı */}
      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-sm bg-background/80 animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => !showBanner && setShowSettings(false)} />
          <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <h2 className="text-xl font-bold text-foreground">Çerez Tercihleri</h2>
              {!showBanner && (
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Zorunlu Çerezler */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-foreground mb-1">Zorunlu Çerezler (Gerekli)</h4>
                  <p className="text-xs text-muted-foreground">
                    Sitenin temel işlevlerinin (güvenlik, ağ yönetimi, erişilebilirlik) çalışması için zorunludur. Bunlar kapatılamaz.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-6 bg-accent rounded-full flex items-center justify-end px-1 opacity-70 cursor-not-allowed">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analitik Çerezler */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-foreground mb-1">Analitik Çerezler</h4>
                  <p className="text-xs text-muted-foreground">
                    Ziyaretçi sayılarını ve trafik kaynaklarını sayarak sitemizin performansını ölçmemize ve iyileştirmemize yardımcı olur.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button 
                    onClick={() => setPreferences(prev => ({...prev, analytics: !prev.analytics}))}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${preferences.analytics ? 'bg-accent justify-end' : 'bg-muted justify-start'}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              {/* Pazarlama Çerezleri */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-foreground mb-1">Pazarlama Çerezleri</h4>
                  <p className="text-xs text-muted-foreground">
                    İlgi alanlarınıza uygun reklamlar göstermek ve reklam kampanyalarının etkinliğini ölçmek için kullanılır.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <button 
                    onClick={() => setPreferences(prev => ({...prev, marketing: !prev.marketing}))}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${preferences.marketing ? 'bg-accent justify-end' : 'bg-muted justify-start'}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30 flex flex-col sm:flex-row items-center justify-end gap-3 mt-auto">
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-foreground bg-background border border-border hover:bg-muted transition-colors"
              >
                Tümünü Kabul Et
              </button>
              <button 
                onClick={handleSaveSettings}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl font-bold text-sm text-white bg-accent hover:bg-accent/90 transition-colors shadow-accent"
              >
                Tercihleri Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
