import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(private readonly configs: ConfigService) {}
  getHello(): string {
    return 'Hello World!' + this.configs.get<string>('database.host');
  }
}
