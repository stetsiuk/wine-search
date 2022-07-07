import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.API_SERVER || 5000;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: String(process.env.REACT_APP_URL)  || 'http://localhost:3000'
  });
  app.setGlobalPrefix('api')

  await app.listen(PORT);
}
bootstrap();
