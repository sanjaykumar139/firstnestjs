export class Tasks {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export enum TaskStatus {
  open = 1,
  closed = 2,
}

export class CreateTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
