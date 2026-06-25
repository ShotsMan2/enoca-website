import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const dbPath = path.join(process.cwd(), 'data', 'db.json');

async function main() {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  console.log('Clearing old data...');
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.news.deleteMany();
  await prisma.message.deleteMany();
  await prisma.page.deleteMany();
  await prisma.job.deleteMany();
  await prisma.application.deleteMany();
  await prisma.setting.deleteMany();

  console.log('Inserting new data...');
  // 1. NewsletterSubscribers
  if (data.newsletterSubscribers) {
    for (const sub of data.newsletterSubscribers) {
      await prisma.newsletterSubscriber.create({
        data: {
          id: sub.id.toString(),
          email: sub.email,
          subscribedAt: new Date(sub.subscribedAt),
        },
      });
    }
  }

  // 2. News
  if (data.news) {
    for (const n of data.news) {
      await prisma.news.create({
        data: {
          title: n.title,
          summary: n.summary,
          imageUrl: n.imageUrl,
          publishedAt: n.publishedAt,
          status: n.status,
        },
      });
    }
  }

  // 3. Messages
  if (data.messages) {
    for (const m of data.messages) {
      await prisma.message.create({
        data: {
          name: m.name || '',
          email: m.email || '',
          message: m.message || '',
          receivedAt: new Date(m.receivedAt || Date.now()),
          isRead: !!m.isRead,
        },
      });
    }
  }

  // 4. Pages
  if (data.pages) {
    for (const p of data.pages) {
      await prisma.page.create({
        data: {
          menuTitle: p.menuTitle,
          menuTitleEn: p.menuTitleEn,
          slug: p.slug,
          category: p.category,
          content: p.content,
          status: p.status,
          updatedAt: p.updatedAt,
        },
      });
    }
  }

  // 5. Jobs
  if (data.jobs) {
    for (const j of data.jobs) {
      await prisma.job.create({
        data: {
          title: j.title,
          department: j.department,
          location: j.location,
          type: j.type,
          description: j.description,
          requirements: JSON.stringify(j.requirements || []),
          responsibilities: JSON.stringify(j.responsibilities || []),
          status: j.status,
          createdAt: j.createdAt || new Date().toISOString(),
        },
      });
    }
  }

  // 6. Applications
  if (data.applications) {
    for (const a of data.applications) {
      await prisma.application.create({
        data: {
          jobId: a.jobId,
          fullName: a.fullName || a.name || '',
          email: a.email || '',
          phone: a.phone || '',
          linkedinUrl: a.linkedinUrl || '',
          cvUrl: a.cvUrl || '',
          coverLetter: a.coverLetter || '',
          status: a.status,
          appliedAt: a.appliedAt,
        },
      });
    }
  }

  // 7. Settings (stats, settings, hero, homepage)
  const settingKeys = ['stats', 'settings', 'hero', 'homepage'];
  for (const key of settingKeys) {
    if (data[key]) {
      await prisma.setting.create({
        data: {
          key: key,
          value: JSON.stringify(data[key]),
        },
      });
    }
  }

  console.log('Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
