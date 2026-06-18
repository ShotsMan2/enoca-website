import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { LinksModule } from './links/links.module';
import { Category } from './categories/entities/category.entity';
import { Link } from './links/entities/link.entity';

@Module({
  imports: [
    // Veritabanı bilgilerini doğrudan ve açıkça tanımlıyoruz
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'SelimEfe23570',
      database: 'enoca_db',
      entities: [Category, Link],
      synchronize: true, // Tabloları otomatik oluşturur
    }),
    CategoriesModule,
    LinksModule,
  ],
})
export class AppModule {}