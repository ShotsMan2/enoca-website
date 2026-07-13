import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  
  if (entity === 'backup') {
    return NextResponse.json({ error: 'Backup not implemented for DB yet' }, { status: 400 });
  }

  try {
    let result;
    if (entity === 'newsletterSubscribers') result = await prisma.newsletterSubscriber.findMany();
    else if (entity === 'news') result = await prisma.news.findMany({ orderBy: { id: 'asc' } });
    else if (entity === 'messages') result = await prisma.message.findMany({ orderBy: { id: 'asc' } });
    else if (entity === 'pages') result = await prisma.page.findMany({ orderBy: { id: 'asc' } });
    else if (entity === 'jobs') {
      const rawJobs = await prisma.job.findMany({ orderBy: { id: 'asc' } });
      result = rawJobs.map(j => ({
        ...j,
        requirements: typeof j.requirements === 'string' ? JSON.parse(j.requirements) : j.requirements,
        responsibilities: typeof j.responsibilities === 'string' ? JSON.parse(j.responsibilities) : j.responsibilities
      }));
    }
    else if (entity === 'applications') {
      const rawApps = await prisma.application.findMany({ orderBy: { id: 'asc' } });
      const rawJobs = await prisma.job.findMany();
      result = rawApps.map(a => {
        const job = rawJobs.find(j => j.id === a.jobId);
        return {
          id: a.id,
          jobId: a.jobId,
          jobTitle: job ? job.title : "Başvuru",
          name: a.fullName,
          email: a.email,
          phone: a.phone,
          portfolioUrl: a.linkedinUrl,
          cvFileName: a.cvUrl,
          cvFileBase64: a.coverLetter,
          status: a.status,
          appliedAt: a.appliedAt
        };
      });
    }
    else if (['stats', 'settings', 'hero', 'homepage', 'logs'].includes(entity)) {
      const setting = await prisma.setting.findUnique({ where: { key: entity } });
      try {
        const parsed = setting ? JSON.parse(setting.value) : (entity === 'logs' ? [] : {});
        result = parsed;
      } catch {
        result = setting ? setting.value : {};
      }
    } else {
      return NextResponse.json({ error: 'Böyle bir entity yok' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB okunamadı' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  
  try {
    const data = await request.json();
    
    if (['stats', 'settings', 'hero', 'homepage', 'logs'].includes(entity)) {
      const stringifiedData = JSON.stringify(data);
      await prisma.setting.upsert({
        where: { key: entity },
        update: { value: stringifiedData },
        create: { key: entity, value: stringifiedData },
      });
      // Cache'i temizle
      revalidatePath('/', 'layout');
      return NextResponse.json({ success: true, data });
    }
    
    const isArray = Array.isArray(data);
    if (!isArray) return NextResponse.json({ error: 'Data must be an array' }, { status: 400 });

    if (entity === 'newsletterSubscribers') {
      await prisma.newsletterSubscriber.deleteMany();
      if(data.length > 0) {
        for(const item of data) {
           await prisma.newsletterSubscriber.create({ data: {
             id: String(item.id),
             email: item.email,
             subscribedAt: new Date(item.subscribedAt)
           }});
        }
      }
    } else if (entity === 'news') {
      await prisma.news.deleteMany();
      if(data.length > 0) await prisma.news.createMany({ data });
    } else if (entity === 'messages') {
      await prisma.message.deleteMany();
      if(data.length > 0) await prisma.message.createMany({ data });
    } else if (entity === 'pages') {
      await prisma.page.deleteMany();
      if(data.length > 0) await prisma.page.createMany({ data });
    } else if (entity === 'jobs') {
      await prisma.job.deleteMany();
      if(data.length > 0) {
        const jobsData = data.map((j: any) => ({
          ...j,
          requirements: JSON.stringify(j.requirements || []),
          responsibilities: JSON.stringify(j.responsibilities || [])
        }));
        await prisma.job.createMany({ data: jobsData });
      }
    } else if (entity === 'applications') {
      await prisma.application.deleteMany();
      if(data.length > 0) {
        const appsData = data.map((a: any) => ({
          id: a.id,
          jobId: a.jobId,
          fullName: a.name || "",
          email: a.email || "",
          phone: a.phone || "",
          linkedinUrl: a.portfolioUrl || "",
          cvUrl: a.cvFileName || "",
          coverLetter: a.cvFileBase64 || "",
          status: a.status || "new",
          appliedAt: a.appliedAt || new Date().toISOString()
        }));
        await prisma.application.createMany({ data: appsData });
      }
    } else {
      return NextResponse.json({ error: 'Böyle bir entity yok' }, { status: 404 });
    }

    // Cache'i temizle
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB yazılamadı' }, { status: 500 });
  }
}
