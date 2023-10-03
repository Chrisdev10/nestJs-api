import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Account } from 'entities/account/account.entity';
import { Audit } from 'entities/audit/audit.properties';
import { Fitness } from 'entities/fitness/fitness.entity';
import { SubscriptionOptions } from 'entities/subs-option/subs-opt.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
@Entity('subscription')
export class Subscription extends AbstractAutoIncEntity {
  @Column()
  type!: string;
  @Column()
  scope!: string;
  @Column({ default: true })
  actif: boolean;
  @Column()
  expiration!: Date;
  @OneToMany(() => Account, account => account.subscription, { cascade: true })
  account: Account[];
  @ManyToOne(() => Fitness, fitness => fitness.subscription)
  @JoinColumn()
  fitness: Fitness;
  @ManyToMany(() => SubscriptionOptions, opt => opt.subscription)
  @JoinTable({
    name: 'subs_subsOPT',
    joinColumn: { name: 'fk_sub_opt', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fk_sub', referencedColumnName: 'id' },
  })
  subscriptionOption: SubscriptionOptions[];
  @Column(() => Audit)
  audit: Audit;
}
