import { Account } from 'entities/account/account.entity';
import { Audit } from 'entities/audit/audit.properties';
import { Fitness } from 'entities/fitness/fitness.entity';
import { SubscriptionOptions } from 'entities/subs-option/subs-opt.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('subscription')
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  type!: string;
  @Column()
  scope!: string;
  @Column()
  expiration!: Date;
  @OneToMany(() => Account, account => account.subscription, { cascade: true })
  account: Account[];
  @ManyToOne(() => Fitness, fitness => fitness.subscription)
  fitness: Fitness;
  @ManyToMany(() => SubscriptionOptions, opt => opt.subscription)
  @JoinColumn()
  subscriptionOption: SubscriptionOptions;
  @Column(() => Audit)
  audit: Audit;
}
