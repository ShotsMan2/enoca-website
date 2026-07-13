const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "News" ADD COLUMN "content" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "News" ADD COLUMN "contentEn" TEXT`);
    console.log('Columns added successfully');
  } catch(e) {
    if (e.message.includes('duplicate column name')) {
       console.log('Columns already exist');
    } else {
       console.error(e.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}
main();
