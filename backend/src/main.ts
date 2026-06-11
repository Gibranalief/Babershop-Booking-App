import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 💡 TAMBAHKAN BLOK KODE CORS INI TEPAT DI SINI
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://babershop-booking-app-mts9.vercel.app', // ⚠️ GANTI dengan URL asli domain Vercel frontend kamu!
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
