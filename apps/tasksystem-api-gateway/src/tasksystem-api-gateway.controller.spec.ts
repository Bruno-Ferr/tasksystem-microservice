import { Test, TestingModule } from '@nestjs/testing';
import { TasksystemApiGatewayController } from './tasksystem-api-gateway.controller';
import { TasksystemApiGatewayService } from './tasksystem-api-gateway.service';

describe('TasksystemApiGatewayController', () => {
  let tasksystemApiGatewayController: TasksystemApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksystemApiGatewayController],
      providers: [TasksystemApiGatewayService],
    }).compile();

    tasksystemApiGatewayController = app.get<TasksystemApiGatewayController>(TasksystemApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tasksystemApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
