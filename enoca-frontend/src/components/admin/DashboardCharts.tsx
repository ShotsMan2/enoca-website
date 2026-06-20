"use client";

import { useTheme } from "next-themes";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useState, useEffect } from "react";

const trafficData = [
  { name: "Pzt", visitors: 400, pageviews: 2400 },
  { name: "Sal", visitors: 600, pageviews: 2100 },
  { name: "Çar", visitors: 800, pageviews: 2900 },
  { name: "Per", visitors: 700, pageviews: 2000 },
  { name: "Cum", visitors: 900, pageviews: 3100 },
  { name: "Cmt", visitors: 1200, pageviews: 4500 },
  { name: "Paz", visitors: 1100, pageviews: 4200 },
];

const interactionData = [
  { name: "Pzt", messages: 12, applications: 4 },
  { name: "Sal", messages: 15, applications: 2 },
  { name: "Çar", messages: 8, applications: 5 },
  { name: "Per", messages: 20, applications: 8 },
  { name: "Cum", messages: 18, applications: 6 },
  { name: "Cmt", messages: 5, applications: 1 },
  { name: "Paz", messages: 4, applications: 0 },
];

export function TrafficChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />;

  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#9CA3AF" : "#6B7280";
  const gridColor = isDark ? "#374151" : "#E5E7EB";

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0052FF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderColor: isDark ? '#374151' : '#E5E7EB', borderRadius: '0.75rem', color: isDark ? '#FFF' : '#000' }}
            itemStyle={{ color: isDark ? '#FFF' : '#000' }}
          />
          <Area type="monotone" dataKey="visitors" stroke="#0052FF" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InteractionChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />;

  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#9CA3AF" : "#6B7280";
  const gridColor = isDark ? "#374151" : "#E5E7EB";

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={interactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }}
            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderColor: isDark ? '#374151' : '#E5E7EB', borderRadius: '0.75rem', color: isDark ? '#FFF' : '#000' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
          <Bar dataKey="messages" name="Mesajlar" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={12} />
          <Bar dataKey="applications" name="Başvurular" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
