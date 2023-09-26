import { Global, Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Role } from 'entities';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Account, Role])],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class CommonModule {}
