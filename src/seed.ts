import { DataSource } from 'typeorm';
import { Category } from './categories/entities/category.entity';
import { Link } from './links/entities/link.entity';

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'SelimEfe23570',
    database: 'enoca_db',
    entities: [Category, Link],
    synchronize: true,
  });

  await dataSource.initialize();

  const categoryRepository = dataSource.getRepository(Category);
  const linkRepository = dataSource.getRepository(Link);

  const categories = [
    {
      name: 'Yazılım Çözümleri',
      slug: 'yazilim-cozumleri',
      order: 1,
      links: [
        { title: 'SAP CX Mimarlığı', url: '/cozumler/sap-cx' },
        { title: 'E-ticaret Platformları', url: '/cozumler/e-ticaret' },
      ],
    },
    {
      name: 'Ar-Ge ve İnovasyon',
      slug: 'ar-ge-ve-inovasyon',
      order: 2,
      links: [
        { title: 'Ürün Tasarımı', url: '/inovasyon/urun-tasarimi' },
        { title: 'Akıllı Otomasyon', url: '/inovasyon/otomasyon' },
      ],
    },
    {
      name: 'Kariyer',
      slug: 'kariyer',
      order: 3,
      links: [
        { title: 'Açık Pozisyonlar', url: '/kariyer' },
        { title: 'Staj Programı', url: '/kariyer/staj' },
      ],
    },
    {
      name: 'Sosyal Sorumluluk',
      slug: 'sosyal-sorumluluk',
      order: 4,
      links: [
        { title: 'Etki Programları', url: '/sosyal-sorumluluk' },
        { title: 'Topluluk Destekleri', url: '/sosyal-sorumluluk/topluluk' },
      ],
    },
  ];

  for (const categoryData of categories) {
    const existing = await categoryRepository.findOne({ where: { slug: categoryData.slug } });
    if (!existing) {
      const category = await categoryRepository.save(categoryRepository.create({
        name: categoryData.name,
        slug: categoryData.slug,
        order: categoryData.order,
      }));

      await linkRepository.save(
        categoryData.links.map((link) => linkRepository.create({
          title: link.title,
          url: link.url,
          category,
        })),
      );
    }
  }

  await dataSource.destroy();
  console.log('Seed verileri başarıyla eklendi.');
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
