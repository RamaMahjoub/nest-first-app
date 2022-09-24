import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from 'src/db-config/db.module';
import { productsProviders } from './products.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [JwtModule, DatabaseModule, UsersModule],
  controllers: [ProductsController],
  providers: [...usersProviders, ...productsProviders, ProductsService],
})
export class ProductsModule {}
