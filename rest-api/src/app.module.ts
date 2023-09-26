import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/database.config';
import { CommonModule } from '@common/common.module';
import { AccountModule } from 'modules/account/account.module';
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
    AuthModule,
    CommonModule,
    AccountModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
