import { readDB } from "@/lib/db";
import { Link } from "@/i18n/routing";
export const dynamic = 'force-dynamic';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { Briefcase, MapPin } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { JobPosting } from "@/lib/admin-api";

export default async function CareersPage() {
  const db = await readDB();
  const jobs: JobPosting[] = (db?.jobs || []) as unknown as JobPosting[];
  const activeJobs = jobs.filter((j) => j.status === "active");
  const t = await getTranslations("Careers");

  return (
    <PublicLayout>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight mb-4">{t('title')}</h1>
            <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>

          {activeJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-950/70 border border-white/10 backdrop-blur rounded-2xl">
              <p className="text-slate-400 text-lg">{t('noJobs')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map((job: any) => (
                <div key={job.id} className="group bg-slate-950/70 border border-white/10 hover:border-sky-400/40 backdrop-blur rounded-2xl p-6 lg:p-8 hover:shadow-[0_20px_50px_rgba(2,132,199,0.1)] transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 opacity-70" /> {job.department} ({job.type})</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 opacity-70" /> {job.location}</span>
                    </div>
                  </div>

                  <Link href={`/kariyer/${job.id}`} className="shrink-0 w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full text-center transition-transform hover:-translate-y-0.5 shadow-md shadow-sky-500/20">
                    {t('viewDetails')}
                  </Link>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
