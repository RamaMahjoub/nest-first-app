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
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Headers('Authorization') auth: string,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.productsService.create(json['sub'], createProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
    @Body() updateProductDtp: UpdateProductDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.productsService.update(id, json['sub'], updateProductDtp);
  }

  @Get()
  getAllProductss() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteProduct(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
  ) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    return this.productsService.deleteProduct(json['sub'], id);
  }
}
