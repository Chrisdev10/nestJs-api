import { Exclude } from 'class-transformer';
import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Audit } from 'entities/audit/audit.properties';
import { Person } from 'entities/person/person.entity';
import { Role } from 'entities/role';
import { Subscription } from 'entities/subscription';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('account')
export class Account extends AbstractAutoIncEntity {
  @Column({ name: 'acc_username', nullable: false, length: 25 })
  username!: string;
  @Column({ name: 'acc_password', nullable: false, length: 200 })
  @Exclude({ toPlainOnly: true })
  password!: string;
  @ManyToOne(() => Subscription, subscription => subscription.account, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'fk_sub', referencedColumnName: 'id' })
  subscription: Subscription;
  @OneToOne(() => Person, { cascade: ['insert', 'update'], eager: true })
  @JoinColumn({ name: 'fk_person' })
  person: Person;
  @ManyToMany(() => Role, role => role.account, { eager: true })
  @JoinTable({
    name: 'account_role',
    inverseJoinColumn: { referencedColumnName: 'id', name: 'fk_role' },
    joinColumn: { name: 'fk_account', referencedColumnName: 'id' },
  })
  role: Role[];
  @Column(() => Audit)
  audit: Audit;
}
