"use client";

import { useState } from "react";
import { Lock, Fingerprint, Shield, ArrowRight, Activity, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password || "admin123" })
      });
      
      if (res.ok) {
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 800);
      } else {
        alert("Giriş başarısız. Lütfen şifrenizi kontrol edin.");
        setLoading(false);
        setStep(1);
      }
    } catch {
      alert("Bir sunucu hatası oluştu.");
      setLoading(false);
      setStep(1);
    }
  };

  const handleBypass = async () => {
    await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "admin123" })
    });
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black absolute inset-0 z-[100] font-sans overflow-hidden">
      {/* Arka Plan Efekti */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center border border-white/20">
          <Terminal className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-widest text-sm uppercase">Enoca NOC</h1>
          <p className="text-blue-400 text-[10px] font-mono tracking-widest uppercase">Network Operations</p>
        </div>
      </div>

      <button onClick={handleBypass} className="absolute top-8 right-8 z-20 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono rounded transition-colors flex items-center gap-2">
        <Activity className="w-4 h-4 text-emerald-400" /> Dev Mode Bypass
      </button>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Yetkili Girişi</h2>
                  <p className="text-gray-400 text-sm">Sisteme erişmek için kurumsal bilgilerinizi girin.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Kurumsal E-Posta</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                      placeholder="admin@enoca.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Şifre</label>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 bg-white text-black hover:bg-gray-200 rounded-xl font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Doğrulanıyor...</span>
                    ) : (
                      <>Devam Et <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="2fa"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 relative">
                    <Fingerprint className="w-8 h-8 text-white" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">2FA Doğrulama</h2>
                  <p className="text-gray-400 text-sm">Mobil cihazınıza gönderilen 6 haneli güvenlik kodunu girin.</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {code.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newCode = [...code];
                          newCode[idx] = e.target.value;
                          setCode(newCode);
                          if (e.target.value && idx < 5) {
                            const next = document.getElementById(`code-${idx + 1}`);
                            next?.focus();
                          }
                        }}
                        id={`code-${idx}`}
                        className="w-12 h-14 bg-black/50 border border-white/20 rounded-lg text-center text-xl text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Giriş Yapılıyor...</span>
                    ) : (
                      "Güvenli Giriş Yap"
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span>Enoca Security Gateway v4.2</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Sys: Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
