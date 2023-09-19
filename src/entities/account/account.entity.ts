import { Person } from 'entities/person/person.entity';
import { Role } from 'entities/role';
import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  username!: string;
  @Column()
  password!: string;
  @ManyToOne(() => Subscription, subscription => subscription.account)
  subscription: Subscription;
  @OneToOne(() => Person)
  person: Person;
  @ManyToMany(() => Role, role => role.account)
  @JoinColumn()
  role: Role[];
}
