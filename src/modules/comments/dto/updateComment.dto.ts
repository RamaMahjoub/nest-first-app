/* eslint-disable prettier/prettier */
import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsDefined()
  @IsNotEmpty()
  value: string;
}