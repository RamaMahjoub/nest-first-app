import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { user: true },
    });
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    return product;
  }

  async create(userId: string, createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
    });
    newProduct.user = { id: userId } as User;
    return await this.productRepository.save(newProduct);
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (product) {
      if (userId === product.user.id) {
        await this.productRepository.update(id, {
          ...updateProductDto,
        });
        const product = await this.productRepository.findOne({
          where: { id },
          relations: { user: true },
        });
        return product;
      } else throw new UnauthorizedException('Unauthorized');
    } else throw new NotFoundException('Not found');
  }

  async deleteProduct(userId: string, id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (product) {
      if (userId === product.user.id) {
        await this.productRepository.remove(product);
        return product;
      } else throw new UnauthorizedException('Unauthorized');
    } else throw new NotFoundException('Not found');
  }
}
