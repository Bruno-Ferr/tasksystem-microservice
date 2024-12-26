import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksystemApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
