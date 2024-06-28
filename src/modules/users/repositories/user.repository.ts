import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entity/user.entity';
import { UniqueConstraintError } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserInfo: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserInfo.password, 10);
      const data = await this.userModel.create({
        ...createUserInfo,
        password: hashedPassword,
      });
      return data;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { email },
      raw: true,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const [updatedCount] = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    return updatedCount;
  }

  async remove(id: number): Promise<number> {
    const deletedRows = await this.userModel.destroy({
      where: { id },
    });
    return deletedRows;
  }
}
