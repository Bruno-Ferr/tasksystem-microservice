import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'libs/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from 'libs/contracts/tasks/update-task.dto';
import { TASKS_PATTERNS } from 'libs/contracts/tasks/tasks.patterns';

interface DataProps {
  createTaskDto: CreateTaskDto,
  userId: number
}

interface DataPropsUser {
  userId: number
}

interface DataPropsGroup {
  userId: number,
  groupId: number
}

interface DataPropsCreateGroup {
  userInGroup: number[]
  userId: number
}

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_PATTERNS.CREATE)
  create(@Payload() data: DataProps) {
    return this.tasksService.create(data.createTaskDto, data.userId);
  }

  @MessagePattern(TASKS_PATTERNS.CREATE_GROUP)
  createGroup(@Payload() data: DataPropsCreateGroup) {
    console.log(data)
    return this.tasksService.createGroup(data.userInGroup, data.userId);
  }

  @MessagePattern(TASKS_PATTERNS.FIND_ALL)
  findAll(@Payload() data: DataPropsUser) {
    return this.tasksService.findAll(data.userId);
  }

  @MessagePattern(TASKS_PATTERNS.FIND_ALL_GROUP_ID)
  findAllInGroup(@Payload() data: DataPropsGroup) {
    return this.tasksService.findAllInGroup(data.groupId, data.userId);
  }

  @MessagePattern(TASKS_PATTERNS.UPDATE)
  markAsDone(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.markAsDone(updateTaskDto.id, updateTaskDto.userId);
  }
}
