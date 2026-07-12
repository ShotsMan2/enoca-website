const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.setting.findMany();
  const hp = settings.find(x => x.key === 'homepage');
  console.log(JSON.stringify(hp, null, 2));
}
main();
