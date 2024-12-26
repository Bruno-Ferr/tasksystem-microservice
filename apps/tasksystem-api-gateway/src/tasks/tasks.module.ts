import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3002 }
      },
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: { port: 3001 }
      }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
