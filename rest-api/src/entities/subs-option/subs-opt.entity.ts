import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Audit } from 'entities/audit/audit.properties';
import { Subscription } from 'entities/subscription';
import { Column, Entity, ManyToMany } from 'typeorm';
@Entity('subscriptionOptions')
export class SubscriptionOptions extends AbstractAutoIncEntity {
  @Column()
  name!: string;
  @Column()
  description!: string;
  @Column()
  cost!: number;
  @ManyToMany(() => Subscription, subs => subs.subscriptionOption)
  subscription: Subscription[];
  @Column(() => Audit)
  audit: Audit;
}
