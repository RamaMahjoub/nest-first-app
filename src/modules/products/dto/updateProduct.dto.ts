/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  productCategory: string;

  @IsOptional()
  productQuantity: number;

  @IsOptional()
  productPrice: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ProductExe_date: Date;
}
