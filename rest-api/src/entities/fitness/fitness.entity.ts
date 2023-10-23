import { AbstractAutoIncEntity } from '@common/models/entity/abstractAutoIncEntity.entities';
import { Adress } from '@common/models/entity/adress';
import { Subscription } from 'modules/subscription/models/entity/subscription';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
@Entity('fitness')
export class Fitness extends AbstractAutoIncEntity {
  @Column()
  capacity!: number;
  @Column()
  area!: number;
  @OneToOne(() => Adress)
  @JoinColumn({ name: 'fk_adress' })
  adress: Adress;
  @OneToMany(() => Subscription, subscription => subscription.account)
  subscription: Subscription[];
}
