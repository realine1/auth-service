import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001 },
  });
  await app.listen();
  console.log('Auth-Service is running on port 3001');
}
bootstrap();
