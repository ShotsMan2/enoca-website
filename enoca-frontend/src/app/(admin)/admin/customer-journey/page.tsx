"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { BrainCircuit, MousePointerClick, Users, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const funnelData = [
  { step: "Ana Sayfa", users: 12500, dropoff: 0 },
  { step: "Çözümler", users: 8400, dropoff: 32 },
  { step: "İletişim Formu", users: 3200, dropoff: 61 },
  { step: "Form Gönderimi", users: 850, dropoff: 73 }
];

const activityData = [
  { time: "00:00", active: 120 }, { time: "04:00", active: 80 }, { time: "08:00", active: 450 },
  { time: "12:00", active: 890 }, { time: "16:00", active: 750 }, { time: "20:00", active: 320 },
  { time: "23:59", active: 150 }
];

export default function CustomerJourneyPage() {
  const [mounted, setMounted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    let i = 0;
    const txt = "AI Analizi: Ziyaretçilerin %61'i 'Çözümler' sayfasından 'İletişim' sayfasına geçerken kaybediliyor. İletişim butonunun rengini daha belirgin bir renge (örn. Enerjik Turuncu) çevirmeniz dönüşümleri (conversion) %18 artırabilir. Ayrıca mobil cihazlardan gelen trafiğin %45'i hemen çıkma (bounce) eğiliminde.";
    
    const interval = setInterval(() => {
      if (i < txt.length) {
        setAiAnalysis(prev => prev + txt.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <AdminHeader title="AI Müşteri Davranış Analizi" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* AI Insight Bar */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">Sentinel AI <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Insights</span></h3>
            <p className="text-indigo-100 min-h-[48px] text-sm leading-relaxed">
              {aiAnalysis}
              <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Funnel Chart */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><TrendingDown className="w-5 h-5 text-rose-500" /> Dönüşüm Hunisi (Funnel)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="step" type="category" width={100} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#FFF' }}
                  />
                  <Bar dataKey="users" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={30} name="Kullanıcı Sayısı" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Simulated Heatmap */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><MousePointerClick className="w-5 h-5 text-blue-500" /> Etkileşim Isı Haritası (Heatmap)</h3>
            
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl relative overflow-hidden flex flex-col p-4 border border-gray-200 dark:border-gray-700">
              <div className="w-full h-8 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 mb-4 flex justify-end p-1 gap-2">
                 <div className="w-16 h-full bg-gray-200 dark:bg-gray-800 rounded" />
                 <div className="w-16 h-full bg-gray-200 dark:bg-gray-800 rounded relative">
                   <div className="absolute -inset-4 bg-rose-500/40 blur-xl rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
                 </div>
              </div>
              <div className="w-1/2 h-32 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 mb-4 p-4">
                 <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
                 <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded mb-1" />
                 <div className="w-5/6 h-2 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                 <div className="w-24 h-8 bg-blue-500 rounded relative">
                   <div className="absolute -inset-6 bg-rose-500/60 blur-xl rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
                 </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-auto">Ana Sayfa - &quot;Bize Ulaşın&quot; CTA Etkileşimi Yoğunluğu</p>
            </div>
          </div>

        </div>

        {/* Daily Activity Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><Users className="w-5 h-5 text-emerald-500" /> Günlük Aktif Ziyaretçi Yoğunluğu</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#FFF' }} />
                <Area type="monotone" dataKey="active" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" name="Kullanıcı" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
