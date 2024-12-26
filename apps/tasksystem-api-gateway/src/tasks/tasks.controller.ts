import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'libs/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from 'libs/contracts/tasks/update-task.dto';
import { Request } from 'express';


interface myObjProps {
  userInGroup: number[]
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    return this.tasksService.create(createTaskDto, request);
  }

  @Post('/group')
  createGroup(@Body() myObj: myObjProps, @Req() request: Request) {
    return this.tasksService.createGroup(myObj, request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.tasksService.findAll(request);
  }

  @Get('/group/:id')
  findAllGroupTasks(@Param('id') id: string, @Req() request: Request) { //Trocar @Req por @headers('authorization') auth: string
    return this.tasksService.findAllGroupTask(+id, request);
  }

  @Patch(':id')
  markAsDone(@Param('id') id: string, @Req() request: Request) {
    return this.tasksService.markAsDone(+id, request);
  }

}
