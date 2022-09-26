import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>, // @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.userRepository.update({ id }, { ...updateUserDto });

    const updatedUser = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.password', 'user.id', 'user.email'])
      .getOne();
  }
}
