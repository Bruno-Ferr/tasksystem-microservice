import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTaskDto } from 'libs/contracts/tasks/create-task.dto';
import { UpdateTaskDto } from 'libs/contracts/tasks/update-task.dto';



@Injectable()
export class TasksService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientKafka
  ) {}
  private tasks = [{
    id: 1,
    title: 'Task 1',
    description: '',
    priority: 5,
    createdBy: 1,
    isDone: false,
    groupId: null,
    createdAt: '26/11/2024'
  }, {
    id: 2,
    title: 'Task 2',
    description: '',
    priority: 3,
    createdBy: 1,
    isDone: true,
    groupId: null,
    createdAt: '26/11/2024'
  }]

  private groups = [
    {
      groupId: 1,
      groupUsers: [2],
    }
  ]

  create(createTaskDto: CreateTaskDto, userId: number) {
    if(createTaskDto.groupId != null) {
      const group = this.groups.find(group => group.groupId === createTaskDto.groupId)
      if(!group.groupUsers.includes(userId)) {
        return "You can't do that"
      }
    }
    const newTask = {
      id: this.tasks.length + 1,
      ...createTaskDto,
      createdBy: userId,
      createdAt: new Date().toString()
    }

    this.tasks.push(newTask);
    return 'Task created';
  }

  createGroup(userInGroup: number[], userId: number) {
    this.groups.push({
      groupId: this.groups.length + 1,
      groupUsers: [...userInGroup, userId]
    })

    return "Group created";
  }

  findAll(userId: number) {
    return this.tasks.filter(task => task.createdBy === userId);
  }

  findAllInGroup(groupId: number, userId: number) {
    const getGroup = this.groups.find(group => group.groupId === groupId);
    if(!getGroup) {
      return "Grupo não existe!";
    }

    const userInGroup = getGroup.groupUsers.find(id => id === userId);
    if(!userInGroup) {
      return "Grupo não existe!";
    }

    return this.tasks.filter(task => task.groupId === groupId);
  }

  markAsDone(id: number, userId: number) {
    //Busca a task
    const task = this.tasks.find(task => task.id === id);

    //Se o criador, for o próprio user: Marca como Feito ou Desfeito e retorna
    if(task.createdBy === userId) {
      this.notificationClient.emit('notification-topic', id.toString());
      task.isDone = !task.isDone
      return task;
    }

    //Busca o grupo da task
    const group = this.groups.find(group => group.groupId == task.groupId);
    if(!group) return "Group doesn't exits"

    const isUserInGroup = group.groupUsers.includes(userId);
    if(!isUserInGroup) return "User not in group"

    this.notificationClient.emit('notification-topic', id.toString());
    task.isDone = !task.isDone;
    return task;
  }
}
