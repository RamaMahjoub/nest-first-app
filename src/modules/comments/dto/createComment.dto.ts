/* eslint-disable prettier/prettier */
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsDefined()
  @IsNotEmpty()
  value: string;
}
