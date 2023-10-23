import { Column, CreateDateColumn } from 'typeorm';

export class Audit {
  @Column({ name: 'createdBy' })
  createdBy: string;
  @CreateDateColumn({
    name: 'createdOn',
  })
  createdOn: Date;
}
