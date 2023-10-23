import { AbstractAutoIncEntity } from '@common/models/entity/abstractAutoIncEntity.entities';
import { Account } from '@common/models/entity/account/account.entity';
import { Fitness } from 'entities/fitness/fitness.entity';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
@Entity('subscription')
export class Subscription extends AbstractAutoIncEntity {
  @Column({ type: 'char' })
  type!: string;
  @Column({ type: 'char' })
  scope!: string;
  @Column({ default: true })
  actif: boolean;
  @Column()
  expiration!: Date;
  @OneToMany(() => Account, account => account.subscription)
  account: Account[];
  @ManyToOne(() => Fitness, fitness => fitness.subscription)
  @JoinColumn()
  fitness: Fitness;
}
