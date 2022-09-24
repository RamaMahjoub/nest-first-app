/* eslint-disable prettier/prettier */
import { Product } from 'src/entities/product.entity';
import { DataSource } from 'typeorm';

export const productsProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
