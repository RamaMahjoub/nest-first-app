import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment } from 'src/entities/comment.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findProductComments(productId: string) {
    const comments = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.comments', 'comment')
      .where('product.id = :productId', { productId });
    return await comments.getMany();
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    productId: string,
  ) {
    const newComment = new Comment();
    newComment.product = { id: productId } as Product;
    newComment.user = { id: userId } as User;
    newComment.value = createCommentDto.value;
    return await this.commentRepository.save(newComment);
  }

  async update(
    updateCommentDto: UpdateCommentDto,
    userId: string,
    commentId: string,
  ) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: {
        user: true,
      },
    });
    if (comment) {
      if (userId === comment.user.id) {
        await this.commentRepository.update(commentId, {
          ...updateCommentDto,
        });
        const comment = await this.commentRepository.findOne({
          where: { id: commentId },
          relations: { user: true },
        });
        return comment;
      } else throw new UnauthorizedException('Unauthorized');
    } else throw new NotFoundException('Not found');
  }

  async delete(userId: string, commentId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: {
        user: true,
      },
    });
    if (comment) {
      if (userId === comment.user.id) {
        await this.commentRepository.remove(comment);
        return comment;
      } else throw new UnauthorizedException('Unauthorized');
    } else throw new NotFoundException('Not found');
  }
}
