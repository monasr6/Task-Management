import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskState } from './task-status.enum';

export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state: TaskState;
}
