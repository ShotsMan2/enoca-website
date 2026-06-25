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
  blue:   { bg: "bg-blue-50 dark:bg-blue-900/20",   icon: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",   text: "text-blue-600 dark:text-blue-400" },
  green:  { bg: "bg-green-50 dark:bg-green-900/20", icon: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400", text: "text-green-600 dark:text-green-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/20",icon: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",text: "text-purple-600 dark:text-purple-400"},
  orange: { bg: "bg-orange-50 dark:bg-orange-900/20",icon: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",text: "text-orange-600 dark:text-orange-400"},
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
    <div className={`group relative rounded-2xl p-6 ${c.bg} border border-white/60 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
      {/* Background Sparkline */}
      {sparklineData && (
        <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-300" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d={generateSparkline() || ""} fill="none" stroke="currentColor" strokeWidth="3" className={`text-${color}-500`} vectorEffect="non-scaling-stroke" />
          <path d={`${generateSparkline()} L100,100 L0,100 Z`} fill="currentColor" className={`text-${color}-500/20`} />
        </svg>
      )}

      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
          {icon}
        </span>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
            {positive ? "▲" : "▼"} {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-gray-800 dark:text-white mb-1">{value?.toLocaleString() ?? "—"}</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
}
