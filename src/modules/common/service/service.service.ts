import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(@InjectRepository(Role) private accountRepo: Repository<Role>) {}
  findOne(id: number): Promise<Role | null> {
    console.log(id);

    return this.accountRepo.findOneBy({ id });
  }
  findAll(): Promise<Role[]> {
    return this.accountRepo.find();
  }
}
