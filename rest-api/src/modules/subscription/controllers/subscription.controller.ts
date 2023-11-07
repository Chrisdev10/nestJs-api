import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscriptionPayload } from '../models/payload/subscription.payload';
import { SubscriptionService } from '../services/subscription.service';
import { Account } from '@common/models/entity';
import { Subscription } from '@Modules/subscription';
import { Auth } from '@common/decorators/roles.decorator';
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
