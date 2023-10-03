import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscriptionPayload } from '../payload/subscription.payload';
import { SubscriptionService } from '../services/subscription.service';
import { Account, Subscription } from 'entities';
import { Auth } from '@common/decorators/roles.decorator';
@ApiTags('Subscription')
@Controller('subscription')
@ApiBearerAuth('access-token')
export class SubscriptionController {
  constructor(private readonly subService: SubscriptionService) {}
  @Post()
  @Auth()
  async createSubs(@Body() payload: SubscriptionPayload): Promise<Account> {
    return this.subService.createSubscription(payload);
  }
  @Get()
  @Auth('ADMIN')
  async getAllSubs(): Promise<Subscription[]> {
    return this.subService.getAllSubscription();
  }
  @Post(':id')
  @Auth('ADMIN')
  async disableSubscription(@Param() id: string): Promise<boolean> {
    return await this.subService.removeSubscription(id);
  }
}
