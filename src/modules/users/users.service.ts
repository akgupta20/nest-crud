import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    // console.log(user);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const updatedCount = await this.userRepository.update(id, updateUserDto);
    if (updatedCount > 0) {
      return `User with ID ${id} updated`;

      //UnauthorizedException

      //uhoiu
    }
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  async remove(id: number): Promise<string> {
    const deletedCount = await this.userRepository.remove(id);
    if (deletedCount > 0) {
      return `User with ID ${id} removed`;
    }
    throw new NotFoundException(`User with ID ${id} not found`);
  }
}
