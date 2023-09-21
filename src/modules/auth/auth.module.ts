import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TokenModule],
})
export class AuthModule {}
