import { AbstractAutoIncEntity } from 'entities/abstractAutoIncEntity.entities';
import { Audit } from 'entities/audit/audit.properties';
import { Fitness } from 'entities/fitness';
import { Person } from 'entities/person';
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';

@Entity('adress')
export class Adress extends AbstractAutoIncEntity {
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
  @ManyToMany(() => Adress, adress => adress.person)
  person: Person[];
  @OneToOne(() => Fitness)
  fitness: Fitness;
}
