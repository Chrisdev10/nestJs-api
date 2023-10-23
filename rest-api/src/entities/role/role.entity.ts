import { AbstractAutoIncEntity } from '@common/models/entity/abstractAutoIncEntity.entities';
import { Account } from '@common/models/entity/account';
import { Column, Entity, ManyToMany } from 'typeorm';
@Entity('role')
export class Role extends AbstractAutoIncEntity {
  @Column({ name: 'r_name' })
  name!: string;
  @ManyToMany(() => Account, account => account.role)
  account: Account[];
}
