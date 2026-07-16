import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CacheControlInterceptor } from './cache.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend uygulamalarının API'ye erişebilmesi için CORS'u açıyoruz
  app.enableCors();

  // DTO'lar üzerinden gelen verilerin otomatik doğrulanmasını sağlar
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Global Cache-Control Interceptor eklendi
  app.useGlobalInterceptors(new CacheControlInterceptor());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Uygulama port ${port} üzerinde çalışıyor...`);
}
bootstrap();