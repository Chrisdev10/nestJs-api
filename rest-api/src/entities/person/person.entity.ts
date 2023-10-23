import { AbstractAutoIncEntity } from '@common/models/entity/abstractAutoIncEntity.entities';
import { Account } from '@common/models/entity/account';
import { Adress } from '@common/models/entity/adress/adress.entity';
import { Column, Entity, OneToOne, ManyToMany, JoinTable } from 'typeorm';

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
}
