import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/db-config/db.module';
import { commentsProviders } from './comments.providers';
import { productsProviders } from '../products/products.providers';
import { usersProviders } from '../users/users.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [CommentsController],
  providers: [
    ...commentsProviders,
    ...productsProviders,
    ...usersProviders,
    CommentsService,
  ],
})
export class CommentsModule {}
