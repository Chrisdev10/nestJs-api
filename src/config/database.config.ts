import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['./entities/*.entity{.ts,.js}'],
  synchronize: true,
}));
