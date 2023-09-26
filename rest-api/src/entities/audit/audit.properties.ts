import { Column } from 'typeorm';

export class Audit {
  @Column({ name: 'createdBy' })
  createdBy: string;
  @Column({
    name: 'createdOn',
  })
  createdOn: Date;
}
