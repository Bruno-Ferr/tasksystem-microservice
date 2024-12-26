import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    }
  );
  await app.listen();
  
}
bootstrap();
