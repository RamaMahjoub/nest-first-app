/* eslint-disable prettier/prettier */
import { Comment } from 'src/entities/comment.entity';
import { DataSource } from 'typeorm';
export const commentsProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (datasource: DataSource) => datasource.getRepository(Comment),
    inject: ['DATA_SOURCE'],
  },
];


