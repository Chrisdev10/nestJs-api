import { BaseEntity, PrimaryColumn, BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Audit } from './audit';
export class AbstractAutoIncEntity extends BaseEntity {
  // @PrimaryColumn('varchar', {
  //   length: 26,
  //   default: () => `'${ulid()}'`,
  // })
  @PrimaryColumn('varchar', { length: 26 })
  id: string;
  @BeforeInsert()
  generate() {
    if (!this.id) this.id = ulid();
  }
  @Column(() => Audit)
  audit: Audit;
}
