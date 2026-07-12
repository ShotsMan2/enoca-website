const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const imagesDir = path.join(__dirname, 'public', 'images', 'features');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const src1 = "C:\\Users\\uysal\\.gemini\\antigravity\\brain\\f646c952-8777-42ea-8a5c-6e9233f30859\\feature_01_quality_1783870051427.png";
  const src2 = "C:\\Users\\uysal\\.gemini\\antigravity\\brain\\f646c952-8777-42ea-8a5c-6e9233f30859\\feature_02_architecture_1783870062225.png";
  const src3 = "C:\\Users\\uysal\\.gemini\\antigravity\\brain\\f646c952-8777-42ea-8a5c-6e9233f30859\\feature_03_agile_1783870078576.png";
  const src4 = "C:\\Users\\uysal\\.gemini\\antigravity\\brain\\f646c952-8777-42ea-8a5c-6e9233f30859\\feature_04_support_1783870088153.png";

  fs.copyFileSync(src1, path.join(imagesDir, 'feature_01.png'));
  fs.copyFileSync(src2, path.join(imagesDir, 'feature_02.png'));
  fs.copyFileSync(src3, path.join(imagesDir, 'feature_03.png'));
  fs.copyFileSync(src4, path.join(imagesDir, 'feature_04.png'));

  const settings = await prisma.setting.findMany();
  const hpSetting = settings.find(x => x.key === 'homepage');
  if (hpSetting) {
    const data = JSON.parse(hpSetting.value);
    if (data.features) {
      data.features[0].image = "/images/features/feature_01.png";
      data.features[1].image = "/images/features/feature_02.png";
      data.features[2].image = "/images/features/feature_03.png";
      data.features[3].image = "/images/features/feature_04.png";
      
      await prisma.setting.update({
        where: { id: hpSetting.id },
        data: { value: JSON.stringify(data) }
      });
      console.log("Updated DB successfully");
    }
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
