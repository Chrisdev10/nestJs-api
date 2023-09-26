import { Adress } from 'entities/adress';
import { Audit } from 'entities/audit/audit.properties';
import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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
  @OneToOne(() => Adress)
  @JoinColumn()
  adress: Adress;
  @OneToMany(() => Subscription, subscription => subscription.account)
  subscription: Subscription[];
  @Column(() => Audit)
  audit: Audit;
}
