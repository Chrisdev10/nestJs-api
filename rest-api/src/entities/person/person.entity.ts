import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Account } from 'entities/account';
import { Adress } from 'entities/adress/adress.entity';
import { Audit } from 'entities/audit/audit.properties';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('person')
export class Person extends AbstractAutoIncEntity {
  @Column({ nullable: false, length: 40 })
  lastname!: string;
  @Column({ nullable: false, length: 40 })
  firstname!: string;
  @Column({ nullable: false })
  birthdate!: Date;
  @Column({ nullable: false })
  email!: string;
  @Column()
  phone!: string;
  @OneToOne(() => Account)
  account: Account;
  @ManyToMany(() => Adress, adress => adress.person)
  @JoinTable({
    name: 'account_adress',
    inverseJoinColumn: { referencedColumnName: 'id', name: 'fk_adress' },
    joinColumn: { name: 'fk_person', referencedColumnName: 'id' },
  })
  adress: Adress[];
  @Column(() => Audit)
  audit: Audit;
}
