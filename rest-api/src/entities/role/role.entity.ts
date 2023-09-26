import { Account } from 'entities/account';
import { Audit } from 'entities/audit/audit.properties';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ name: 'r_name' })
  name!: string;
  @ManyToMany(() => Account, account => account.role)
  account: Account[];
  @Column(() => Audit)
  audit: Audit;
}
