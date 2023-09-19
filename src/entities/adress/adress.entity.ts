import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('adress')
export class Adress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  street!: string;
  @Column()
  cp!: number;
  @Column()
  city!: string;
  @Column()
  country!: string;
}
