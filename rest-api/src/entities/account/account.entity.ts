import { Exclude } from 'class-transformer';
import { Audit } from 'entities/audit/audit.properties';
import { Person } from 'entities/person/person.entity';
import { Role } from 'entities/role';
import { Subscription } from 'entities/subscription';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulid';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryColumn('varchar', {
    length: 26,
    default: () => `'${ulid()}'`,
  })
  id: string;
  @Column({ name: 'acc_username', nullable: false, length: 25 })
  username!: string;
  @Column({ name: 'acc_password', nullable: false, length: 200 })
  @Exclude({ toPlainOnly: true })
  password!: string;
  @ManyToOne(() => Subscription, subscription => subscription.account)
  @JoinColumn({ name: 'fk_sub', referencedColumnName: 'id' })
  subscription: Subscription;
  @OneToOne(() => Person)
  person: Person;
  @ManyToMany(() => Role, role => role.account)
  @JoinTable({
    name: 'account_role',
    inverseJoinColumn: { referencedColumnName: 'id', name: 'fk_role' },
    joinColumn: { name: 'fk_account', referencedColumnName: 'id' },
  })
  role: Role[];
  @Column(() => Audit)
  audit: Audit;
}
