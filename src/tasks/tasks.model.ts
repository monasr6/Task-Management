export interface Task {
  title: string;
  description: string;
  id: string;
  state: TaskState;
}

export enum TaskState {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}
