import { Module } from '@nestjs/common';
import { TasksystemApiGatewayController } from './tasksystem-api-gateway.controller';
import { TasksystemApiGatewayService } from './tasksystem-api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthModule, TasksModule],
  controllers: [TasksystemApiGatewayController],
  providers: [TasksystemApiGatewayService],
})
export class TasksystemApiGatewayModule {}
