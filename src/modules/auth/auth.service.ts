import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrpt from 'bcrypt';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UpdateUserDto } from '../users/dto/updateUser.dto';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) throw new BadRequestException('User already exists');

    const newUser = await this.usersService.create(createUserDto);
    const user = await this.usersService.findByEmail(newUser.email);
    const tokens = await this.getTokens(newUser.id, newUser.email);

    const updateUserDto: UpdateUserDto = { ...user };
    updateUserDto.refreshToken = tokens.refreshToken;
    await this.usersService.update(newUser.id, updateUserDto);
    return tokens;
  }

  async signIn(data: AuthDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User does not exists');
    }
    const matchPassword = await bycrpt.compare(data.password, user.password);
    if (!matchPassword) throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    const updateUserDto: UpdateUserDto = { ...user };
    updateUserDto.refreshToken = tokens.refreshToken;
    await this.usersService.update(user.id, updateUserDto);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    const hashRefreshToken = await bycrpt.hash(refreshToken, 10);

    const updateUserDto: UpdateUserDto = { ...user };
    updateUserDto.refreshToken = hashRefreshToken;
    await this.usersService.update(user.id, updateUserDto);
  }

  async logout(userId: string) {
    const user = await this.usersService.findById(userId);
    const updateUserDto: UpdateUserDto = { ...user };
    updateUserDto.refreshToken = null;
    return this.usersService.update(userId, updateUserDto);
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '15m',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const matchRefreshToken = user.refreshToken === refreshToken;
    if (!matchRefreshToken) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
