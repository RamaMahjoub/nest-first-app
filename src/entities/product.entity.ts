/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  productName: string;

  @Column({ type: 'varchar' })
  productCategory: string;

  @Column({ type: 'integer' })
  productQuantity: number;

  @Column({ type: 'integer' })
  productPrice: number;

  @Column({ type: 'date' })
  ProductExe_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
