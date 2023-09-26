import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers';
import { TokenController } from './token/token.controller';
@Module({
  providers: [AuthService],
  controllers: [AuthController, TokenController],
  imports: [TokenModule],
})
export class AuthModule {}
