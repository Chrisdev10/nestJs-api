import { BaseEntity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { ulid } from 'ulid';
export class AbstractAutoIncEntity extends BaseEntity {
  @PrimaryColumn('varchar', { length: 26 })
  id: string;
  @BeforeInsert()
  generate() {
    this.id = ulid();
  }
}
