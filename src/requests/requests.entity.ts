import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('requests')
export class Requests {
  @ObjectIdColumn() _id: ObjectID;
  @Column() id: string;
  @Column() method?: string;
  @Column() ip?: string;
  @Column() scheme?: string;
  @Column() birthDate?: Date;
  @Column() query?: any;
  @Column() params?: any;
  @Column() body?: any;
  @Column() cookies?: any;
  @Column() headers?: any;
  @CreateDateColumn() createdAt: Date;

  constructor(requests?: Partial<Requests>) {
    Object.assign(this, requests);
  }
}
