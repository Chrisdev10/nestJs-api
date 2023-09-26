import { Audit } from 'entities/audit/audit.properties';
import { Person } from 'entities/person';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('adress')
export class Adress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ nullable: false, length: 40 })
  street!: string;
  @Column({ nullable: false })
  cp!: number;
  @Column({ nullable: false, length: 40 })
  city!: string;
  @Column({ nullable: false, length: 40 })
  country!: string;
  @Column(() => Audit)
  audit: Audit;
  @ManyToOne(() => Adress, adress => adress.person)
  @JoinColumn()
  person: Person;
}
