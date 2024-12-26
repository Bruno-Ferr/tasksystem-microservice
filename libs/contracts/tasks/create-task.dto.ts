export class CreateTaskDto {
  title: string;
  description: string | null;
  priority: number;
  isDone: boolean;
  groupId: number | null;
}
