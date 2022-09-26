/* eslint-disable prettier/prettier */
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IsMatchPassword } from '../decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsDefined()
  @IsString()
  @IsMatchPassword('password')
  passwordConfirm: string;

  @IsOptional()
  @IsString()
  refreshToken: string;

  
}
