import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
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
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      createCommentDto,
      req.user['sub'],
      productId,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Put(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Req() req: Request,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      updateCommentDto,
      req.user['sub'],
      commentId,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':commentId')
  delete(@Param('commentId') commentId: string, @Req() req: Request) {
    return this.commentsService.delete(req.user['sub'], commentId);
  }
}
