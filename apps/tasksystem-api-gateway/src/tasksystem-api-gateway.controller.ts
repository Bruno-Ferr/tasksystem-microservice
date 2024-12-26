import { Controller, Get } from '@nestjs/common';
import { TasksystemApiGatewayService } from './tasksystem-api-gateway.service';

@Controller()
export class TasksystemApiGatewayController {
  constructor(private readonly tasksystemApiGatewayService: TasksystemApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.tasksystemApiGatewayService.getHello();
  }
}
