/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text'})
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;

}
