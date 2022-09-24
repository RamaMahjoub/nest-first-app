import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get(':productId')
  findProductComments(@Param('productId') productId: string) {
    return this.commentsService.findProductComments(productId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':productId')
  create(
    @Param('productId') productId: string,
    @Headers('Authorization') auth: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.commentsService.create(
      createCommentDto,
      json['sub'],
      productId,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Put(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Headers('Authorization') auth: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.commentsService.update(
      updateCommentDto,
      json['sub'],
      commentId,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':commentId')
  delete(
    @Param('commentId') commentId: string,
    @Headers('Authorization') auth: string,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.commentsService.delete(json['sub'], commentId);
  }
}
