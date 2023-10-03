import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Account } from 'entities/account';
import { Audit } from 'entities/audit/audit.properties';
import { Column, Entity, ManyToMany } from 'typeorm';
@Entity('role')
export class Role extends AbstractAutoIncEntity {
  @Column({ name: 'r_name' })
  name!: string;
  @ManyToMany(() => Account, account => account.role)
  account: Account[];
  @Column(() => Audit)
  audit: Audit;
}
