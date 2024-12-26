import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { json, Request } from 'express';
import { CreateTaskDto } from 'libs/contracts/tasks/create-task.dto';
import { TASKS_PATTERNS } from 'libs/contracts/tasks/tasks.patterns';
import { UpdateTaskDto } from 'libs/contracts/tasks/update-task.dto';
import { firstValueFrom } from 'rxjs';

interface myObjProps {
  userInGroup: number[]
}

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_CLIENT') private taskClient: ClientProxy,
    @Inject('AUTH_CLIENT') private authClient: ClientProxy
  ) {}

  async create(createTaskDto: CreateTaskDto, request: Request) {
    const data = request.headers
    const {userId}: any = await firstValueFrom(this.authClient.send('auth.verifyToken', {data}));
    if(!userId) {
      return "Action cannot be concluded";
    }
    return this.taskClient.send(TASKS_PATTERNS.CREATE, {createTaskDto, userId});
  }

  async createGroup(myObj: myObjProps, request: Request) {
    const data = request.headers
    const {userId}: any = await firstValueFrom(this.authClient.send('auth.verifyToken', {data}));
    const userInGroup = myObj.userInGroup
    return this.taskClient.send(TASKS_PATTERNS.CREATE_GROUP, {userInGroup, userId});
  }

  async findAll(request: Request) {
    const data = request.headers;
    const {userId}: any = await firstValueFrom(this.authClient.send('auth.verifyToken', {data}));
    return this.taskClient.send(TASKS_PATTERNS.FIND_ALL, {userId});
  }

  async findAllGroupTask(groupId: number, request: Request) {
    const data = request.headers;
    const {userId}: any = await firstValueFrom(this.authClient.send('auth.verifyToken', {data}));
    return this.taskClient.send(TASKS_PATTERNS.FIND_ALL_GROUP_ID, {groupId, userId});
  }

  async markAsDone(id: number, request: Request) {
    const data = request.headers;
    const {userId}: any = await firstValueFrom(this.authClient.send('auth.verifyToken', {data}));
    return this.taskClient.send(TASKS_PATTERNS.UPDATE, {id, userId});
  }
}
