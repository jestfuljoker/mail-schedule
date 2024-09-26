import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({path: `.env.${process.env.NODE_ENV || 'development'}`});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  database: configService.getOrThrow("DB_NAME"),
  username: configService.getOrThrow("DB_USER"),
  password: configService.getOrThrow("DB_PASSWORD"),
  host: configService.getOrThrow("DB_HOST", "localhost"),
  port: configService.getOrThrow("DB_PORT", 5432),
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: ['migrations/**'],
});
