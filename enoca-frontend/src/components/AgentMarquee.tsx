"use client";

import Image from "next/image";
import Marquee from "./Marquee";
import { useTranslations } from "next-intl";

const references = [
  { name: "Adese", logo: "/references/adese.png" },
  { name: "AGT", logo: "/references/agt.png" },
  { name: "Avansas", logo: "/references/avansas.png" },
  { name: "Carrefour", logo: "/references/carrefour.png" },
  { name: "EAE", logo: "/references/eae.png" },
  { name: "ebebek", logo: "/references/ebebek.png" },
  { name: "G2M", logo: "/references/g2m.png" },
  { name: "Gratis", logo: "/references/gratis.png" },
  { name: "Hasçelik", logo: "/references/hascelik.png" },
  { name: "İPRAGAZ", logo: "/references/ipragaz.jpeg" },
  { name: "Istanbul Airport", logo: "/references/iga.png" },
  { name: "KARDEMİR", logo: "/references/kardemir.png" },
  { name: "KOCAER", logo: "/references/kocaer.jpeg" },
  { name: "KOTON", logo: "/references/koton.png" },
  { name: "LC Waikiki", logo: "/references/lcwaikiki.png" },
  { name: "NITORI", logo: "/references/nitori.png" },
  { name: "Penti", logo: "/references/penti.png" },
  { name: "Groupe SEB", logo: "/references/groupeseb.png" },
  { name: "TEKNOSA", logo: "/references/teknosa.png" },
  { name: "TURKCELL", logo: "/references/turkcell.png" },
  { name: "Türk Telekom", logo: "/references/turktelekom.png" },
  { name: "UMA", logo: "/references/uma.png" },
  { name: "VitrA", logo: "/references/vitra.png" },
];

export default function AgentMarquee() {
  const t = useTranslations("References");

  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">{t("subtitle")}</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          {t("title")}
        </h2>
      </div>

      <div className="relative z-10">
        <Marquee speed={30}>
          {references.map((ref, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[180px] h-24 px-8 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer"
            >
              <Image
                src={ref.logo}
                alt={ref.name}
                width={160}
                height={60}
                className="object-contain max-h-14 w-auto"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
