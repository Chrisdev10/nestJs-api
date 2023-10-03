import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Role } from 'entities';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Account, Role])],
})
export class CommonModule {}
