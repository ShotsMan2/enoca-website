"use client";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  sparklineData?: number[];
}

const colorMap = {
  blue:   { bg: "bg-white dark:bg-[#050505]",   icon: "bg-gray-100 dark:bg-[#18191f] text-blue-500",   text: "text-blue-500" },
  green:  { bg: "bg-white dark:bg-[#050505]", icon: "bg-gray-100 dark:bg-[#18191f] text-green-500", text: "text-green-500" },
  purple: { bg: "bg-white dark:bg-[#050505]",icon: "bg-gray-100 dark:bg-[#18191f] text-purple-500",text: "text-purple-500"},
  orange: { bg: "bg-white dark:bg-[#050505]",icon: "bg-gray-100 dark:bg-[#18191f] text-orange-500",text: "text-orange-500"},
};

export default function StatsCard({ title, value, change, positive = true, icon, color, sparklineData }: StatsCardProps) {
  const c = colorMap[color];

  // Sparkline hesaplama (basit line path)
  const generateSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    const points = sparklineData.map((val, i) => {
      const x = (i / (sparklineData.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    }).join(" L");

    return `M${points}`;
  };

  return (
    <div className={`group relative p-6 ${c.bg} border border-gray-200 dark:border-[#18191f] hover:border-gray-400 dark:hover:border-[#606266] transition-all duration-300 overflow-hidden shadow-sm`}>
      {/* Background Sparkline */}
      {sparklineData && (
        <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-300" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d={generateSparkline() || ""} fill="none" stroke="currentColor" strokeWidth="3" className={`text-${color}-500`} vectorEffect="non-scaling-stroke" />
          <path d={`${generateSparkline()} L100,100 L0,100 Z`} fill="currentColor" className={`text-${color}-500/20`} />
        </svg>
      )}

      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className={`w-12 h-12 flex items-center justify-center ${c.icon}`}>
          {icon}
        </span>
        {change && (
          <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 ${positive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
            {positive ? "▲" : "▼"} {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-mono font-black text-gray-900 dark:text-white mb-1">{value?.toLocaleString() ?? "—"}</p>
      <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500 dark:text-[#606266]">{title}</p>
    </div>
  );
}
