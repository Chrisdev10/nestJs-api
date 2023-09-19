import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('subscriptionOptions')
export class SubscriptionOptions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @Column()
  cost!: number;
  @ManyToMany(() => Subscription, subs => subs.subscriptionOption)
  subscription: Subscription[];
}
