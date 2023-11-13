import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Account } from '@common/models/entity';
import { Subscription, SubscriptionService, SubscriptionPayload } from '@Modules/subscription';
import { Auth } from '@common/decorators';
@ApiTags('Subscription')
@Controller('subscription')
@ApiBearerAuth('access-token')
export class SubscriptionController {
  constructor(private readonly subService: SubscriptionService) {}
  @Post()
  @Auth('USER', 'ADMIN')
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
  async disableSubscription(@Param('id') id: string): Promise<boolean> {
    return await this.subService.removeSubscription(id);
  }
}
