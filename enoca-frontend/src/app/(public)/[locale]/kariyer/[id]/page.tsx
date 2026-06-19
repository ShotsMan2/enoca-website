import { readDB } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import JobApplicationForm from "@/components/JobApplicationForm";

// Next.js App Router dynamic page params should be awaited if Next 15+
export default async function JobDetailsPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id } = await params;
  const jobId = parseInt(id, 10);
  
  const db = await readDB();
  const job = db?.jobs?.find((j: any) => j.id === jobId);
  
  if (!job || job.status !== "active") {
    notFound();
  }

  const t = await getTranslations("Careers");

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            
            {/* Sol Sütun: İlan Detayları */}
            <div className="space-y-10">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
                <h1 className="text-3xl md:text-4xl font-black font-display text-gray-900 dark:text-white mb-6 leading-tight">{job.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-semibold">
                    <Briefcase className="w-4 h-4" /> {job.department}
                  </span>
                  <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                    <Calendar className="w-4 h-4" /> {job.type}
                  </span>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                  <h3 className="text-xl font-bold mb-4">{t('jobDesc')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">{t('req')}</h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sağ Sütun: Başvuru Formu */}
            <div className="sticky top-32">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('formTitle')}</h3>
                <JobApplicationForm jobId={job.id} jobTitle={job.title} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
