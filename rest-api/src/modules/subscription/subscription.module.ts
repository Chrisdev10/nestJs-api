import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription.controller';
import { Repository } from 'typeorm';
import { Account, Subscription } from 'entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './services/subscription.service';
import { TokenModule } from 'modules/auth/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Subscription]), TokenModule],
  controllers: [SubscriptionController],
  providers: [Repository<Subscription>, SubscriptionService],
})
export class SubscriptionModule {}
