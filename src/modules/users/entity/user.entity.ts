import { Table, Column, Model } from 'sequelize-typescript';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

@Table
export class User extends Model<User> {
  @IsString()
  @IsNotEmpty()
  @Column
  first_name: string;

  @IsOptional()
  @IsString()
  @Column
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsPhoneNumber()
  @Column
  phone_no: string;

  @IsStrongPassword()
  @Column
  password: string;

  @IsBoolean()
  @Column
  isActive: boolean;

  @IsString()
  @Column
  role: string;

  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  @Column
  gender: Gender;

  @IsOptional()
  @IsNumber()
  @Column
  age: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Column
  address: string;

  @IsOptional()
  @IsString()
  @Column
  occupation: string;
}
