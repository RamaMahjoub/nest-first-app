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
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
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
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user['sub'], createProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateProductDtp: UpdateProductDto,
  ) {
    return this.productsService.update(id, req.user['sub'], updateProductDtp);
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
  deleteProduct(@Req() req: Request, @Param('id') id: string) {
    return this.productsService.deleteProduct(req.user['sub'], id);
  }
}
