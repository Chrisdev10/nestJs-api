import { Account } from 'entities/account';
import { Adress } from 'entities/adress/adress.entity';
import { Audit } from 'entities/audit/audit.properties';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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
  @OneToMany(() => Adress, adress => adress.person)
  adress: Adress[];
  @Column(() => Audit)
  audit: Audit;
}
