import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Adress } from 'entities/adress';
import { Audit } from 'entities/audit/audit.properties';
import { Subscription } from 'entities/subscription';
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
  @Column(() => Audit)
  audit: Audit;
}
