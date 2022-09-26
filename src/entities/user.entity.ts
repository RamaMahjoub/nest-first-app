/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Product } from './product.entity';
import * as bycrpt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert() async hashPassword() {
    this.password = await bycrpt.hash(this.password, 10);
  }
}
