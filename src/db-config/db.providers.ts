/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Comment } from 'src/entities/comment.entity';

config();

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource =  new DataSource({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        database: configService.get('DB_DATABASE'),
        password: configService.get('DB_PASSWORD'),
        entities: [User,Product,Comment],
        // migrations:['src/db/migrations/*.{ts,js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
