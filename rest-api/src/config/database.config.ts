import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [`${__dirname}/../entities/**/*.{js,ts}`, `${__dirname}/../modules/common/models/entity/**/*.entity.{js,ts}`, `${__dirname}/../modules/subscription/models/entity/**/*.entity.{js,ts}`],
  synchronize: true,
}));
