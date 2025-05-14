import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Category } from './src/category/entities/category.entity';
import { Transaction } from './src/transaction/entities/transaction.entity';
import { User } from './src/user/entities/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow('PG_URI'),
  database: configService.getOrThrow('DB_NAME'),
  ssl: true,
  entities: [Category, Transaction, User],
  migrations: ['migrations/**'],
});
