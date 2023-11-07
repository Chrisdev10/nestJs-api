import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'entities';
import { Account } from '@common/models';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Account, Role])],
})
export class CommonModule {}
