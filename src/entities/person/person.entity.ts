import { Account } from 'entities/account';
import { Adress } from 'entities/adress/adress.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  lastname!: string;
  @Column()
  firstname!: string;
  @Column()
  birthdate!: Date;
  @Column()
  email!: string;
  @Column()
  phone!: string;
  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
  @OneToOne(() => Adress)
  @JoinColumn()
  adress: Adress;
}
