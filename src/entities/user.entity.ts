/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Product } from './product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
