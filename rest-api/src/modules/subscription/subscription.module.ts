import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription.controller';
import { Repository } from 'typeorm';
import { Account } from '@common/models';
import { Subscription } from '@Modules/subscription';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './services/subscription.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Subscription])],
  controllers: [SubscriptionController],
  providers: [Repository<Subscription>, SubscriptionService, JwtService],
})
export class SubscriptionModule {}
