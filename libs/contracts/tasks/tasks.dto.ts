export interface TasksProps {
  id: number,
  title: string,
  description: string | null,
  priority: number,
  createdBy: number, //userId
  isDone: boolean,
  createdAt: string
}