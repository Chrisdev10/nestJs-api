import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Subscription } from 'entities';
import { Repository } from 'typeorm';
import {
  SubScope,
  SubType,
  SubscriptionPayload,
} from '../payload/subscription.payload';
import { Builder } from 'builder-pattern';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subsrepo: Repository<Subscription>,
    @InjectRepository(Account)
    private readonly accRepo: Repository<Account>,
  ) {}
  async createSubscription(payload: SubscriptionPayload) {
    const acc = await this.accRepo.findOneBy({ username: payload.username });
    if (!acc) throw new NotFoundException();
    const sub = this.subsrepo.create(
      Builder<Subscription>()
        .type(SubType[payload.type] === 'P' ? SubType.PREMIUM : SubType.NORMAL)
        .expiration(new Date())
        .scope(
          SubScope[payload.scope] === 'G' ? SubScope.GLOBAL : SubScope.SIMPLE,
        )
        .audit({
          createdBy: acc.username,
          createdOn: new Date(),
        })
        .build(),
    );
    await this.subsrepo.save(sub);
    acc.subscription = sub;
    return await this.accRepo.save(acc);
  }
  async getAllSubscription(): Promise<Subscription[]> {
    return this.subsrepo.find();
  }
  async getSubscription(id: string): Promise<Subscription> {
    return this.subsrepo.findOneBy({ id: id });
  }
  async removeSubscription(id: string): Promise<boolean> {
    return (await this.subsrepo.update(id, { actif: false })).affected !== 0;
  }
}
