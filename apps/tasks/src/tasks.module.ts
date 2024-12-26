import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'notification-group'
          }
        }
      }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
