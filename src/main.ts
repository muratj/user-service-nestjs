import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    Logger.log(`Nest service running on port: ${PORT}`);
  });
}
bootstrap();
