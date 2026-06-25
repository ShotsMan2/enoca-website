import { prisma } from './prisma';

// Bu servis, statik db.json okuma yerine artık veritabanından (Prisma) asenkron olarak verileri okur.
export async function readDB() {
  try {
    const [
      newsletterSubscribers,
      news,
      messages,
      pages,
      jobs,
      applications,
      settingsRows
    ] = await Promise.all([
      prisma.newsletterSubscriber.findMany(),
      prisma.news.findMany({ orderBy: { id: 'asc' } }),
      prisma.message.findMany({ orderBy: { id: 'asc' } }),
      prisma.page.findMany({ orderBy: { id: 'asc' } }),
      prisma.job.findMany({ orderBy: { id: 'asc' } }),
      prisma.application.findMany({ orderBy: { id: 'asc' } }),
      prisma.setting.findMany()
    ]);

    const settingsObj: any = {};
    for (const row of settingsRows) {
      try {
        settingsObj[row.key] = JSON.parse(row.value);
      } catch (e) {
        settingsObj[row.key] = row.value;
      }
    }

    const parsedJobs = jobs.map(j => ({
      ...j,
      requirements: typeof j.requirements === 'string' ? JSON.parse(j.requirements) : j.requirements,
      responsibilities: typeof j.responsibilities === 'string' ? JSON.parse(j.responsibilities) : j.responsibilities
    }));

    return {
      newsletterSubscribers,
      news,
      messages,
      pages,
      jobs: parsedJobs,
      applications,
      stats: settingsObj.stats || {},
      settings: settingsObj.settings || {},
      hero: settingsObj.hero || {},
      homepage: settingsObj.homepage || []
    };
  } catch (error) {
    console.error("DB okuma hatası:", error);
    return null;
  }
}

export async function writeDB(data: Record<string, unknown>) {
  console.error("writeDB should no longer be used! API routes now use Prisma directly.");
  return false;
}
