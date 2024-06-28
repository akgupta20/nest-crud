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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsOptional()
  @IsString()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber()
  readonly phone_no: string;

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsString()
  readonly role: string;

  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  readonly gender: Gender; // todo only 3 values are allowed

  @IsOptional()
  @IsNumber()
  readonly age: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly occupation: string;
}
