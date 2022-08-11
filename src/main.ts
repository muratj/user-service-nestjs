import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
    }),
  );

  await app.listen(PORT, () => {
    Logger.log(`Nest service running on port: ${PORT}`);
  });
}
bootstrap();
