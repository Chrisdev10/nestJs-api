import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fitness')
export class Fitness extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  capacity!: number;
  @Column()
  area!: number;
  @Column()
  street!: string;
  @Column()
  cp!: string;
  @Column()
  country!: string;
  @OneToMany(() => Subscription, subscription => subscription.account)
  subscription: Subscription[];
}
