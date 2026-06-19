import { readDB } from "@/lib/db";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Briefcase, MapPin } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

export default async function CareersPage() {
  const db = await readDB();
  const jobs = db?.jobs || [];
  const activeJobs = jobs.filter((j: any) => j.status === "active");
  const t = await getTranslations("Careers");

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white tracking-tight mb-4">{t('title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>

          {activeJobs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t('noJobs')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activeJobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 opacity-70" /> {job.department} ({job.type})</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 opacity-70" /> {job.location}</span>
                    </div>
                  </div>

                  <Link href={`/kariyer/${job.id}`} className="shrink-0 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-transform hover:-translate-y-0.5 shadow-md shadow-blue-600/20">
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
