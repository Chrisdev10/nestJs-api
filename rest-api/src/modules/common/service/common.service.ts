import { AbstractAutoIncEntity } from '@common/models/entity/abstractAutoIncEntity.entities';
import { Repository } from 'typeorm';

export abstract class CommonService<E extends AbstractAutoIncEntity> {
  constructor(private readonly mainRepo: Repository<E>) {}
  async getAllSubscription(): Promise<E[]> {
    return this.mainRepo.find();
  }
  //   async getSubscription(id: string): Promise<E> {
  //     return this.mainRepo.findOneBy({ id: id });
  //   }
  //   async removeSubscription(id: string): Promise<boolean> {
  //     return (await this.mainRepo.update(id, { actif: false })).affected !== 0;
  //   }
}
