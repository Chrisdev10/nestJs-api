import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/database.config';
import { CommonModule } from '@common/common.module';
import { AccountModule } from 'modules/account/account.module';
import { SubscriptionModule } from 'modules/subscription/subscription.module';
import { TokenModule } from 'modules/token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AccountModule,
    SubscriptionModule,
    TokenModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
