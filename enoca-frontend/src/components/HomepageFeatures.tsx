"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRef, useState } from "react";
import Link from "next/link";

interface Feature {
  id: number;
  number: string;
  title: string;
  text: string;
  image?: string;
}

interface HomepageFeaturesProps {
  features: Feature[];
}

export default function HomepageFeatures({ features }: HomepageFeaturesProps) {
  const t = useTranslations("Features");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (!features || features.length === 0) return null;

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative w-full py-16 lg:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-7xl px-6 text-center sm:px-8 lg:px-10"
      >
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
            {t("badge")}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Horizontal Scrollable Cards */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {features.map((feature, index) => {
            const isExpanded = expandedId === feature.id;
            const titleKey = `feature_${feature.number}_title`;
            const textKey = `feature_${feature.number}_text`;
            const displayTitle = feature.title || (t.has(titleKey) ? t(titleKey) : "");
            const displayText = feature.text || (t.has(textKey) ? t(textKey) : "");

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" as const }}
                className={`group relative flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ${
                  isExpanded
                    ? "w-[420px] sm:w-[460px]"
                    : "w-[260px] sm:w-[280px]"
                }`}
                style={{ height: "420px" }}
                onClick={() => toggleExpand(feature.id)}
              >
                {/* Background Image */}
                {feature.image && (
                  <Image
                    src={feature.image}
                    alt={displayTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 280px, 460px"
                  />
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 transition-opacity duration-500" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  {/* Top: Number Badge */}
                  <div>
                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">
                      {t("featureLabel")} {feature.number}
                    </span>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                      {displayTitle}
                    </h3>

                    {/* Expanded content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" as const }}
                      className="overflow-hidden"
                    >
                      {/* Circular Progress Indicator */}
                      <div className="mb-4 flex justify-start">
                        <svg className="h-12 w-12" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="rgba(56, 189, 248, 0.2)"
                            strokeWidth="2"
                          />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="rgba(56, 189, 248, 0.8)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={125.6}
                            strokeDashoffset={125.6 * (1 - ((index + 1) / features.length))}
                            initial={{ strokeDashoffset: 125.6 }}
                            animate={
                              isExpanded
                                ? { strokeDashoffset: 125.6 * (1 - ((index + 1) / features.length)) }
                                : { strokeDashoffset: 125.6 }
                            }
                            transition={{ duration: 1, ease: "easeOut" as const }}
                          />
                        </svg>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-300">
                        {displayText}
                      </p>

                      <Link
                        href={`/${locale}/iletisim`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
                      >
                        {t("exploreMore")}
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom border accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
