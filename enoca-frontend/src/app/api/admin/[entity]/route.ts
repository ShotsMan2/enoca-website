import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    else if (entity === 'jobs') result = await prisma.job.findMany({ orderBy: { id: 'asc' } });
    else if (entity === 'applications') result = await prisma.application.findMany({ orderBy: { id: 'asc' } });
    else if (['stats', 'settings', 'hero', 'homepage'].includes(entity)) {
      const setting = await prisma.setting.findUnique({ where: { key: entity } });
      result = setting ? setting.value : {};
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
    
    if (['stats', 'settings', 'hero', 'homepage'].includes(entity)) {
      await prisma.setting.upsert({
        where: { key: entity },
        update: { value: data },
        create: { key: entity, value: data },
      });
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
      if(data.length > 0) await prisma.job.createMany({ data });
    } else if (entity === 'applications') {
      await prisma.application.deleteMany();
      if(data.length > 0) await prisma.application.createMany({ data });
    } else {
      return NextResponse.json({ error: 'Böyle bir entity yok' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB yazılamadı' }, { status: 500 });
  }
}
