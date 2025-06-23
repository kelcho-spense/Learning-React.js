import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/profile.entity'; // Adjust the import path as necessary

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(Role, {
    message:
      'Role must be one of the following: student, faculty, admin, guest',
  })
  role: Role = Role.GUEST; // Default role set to GUEST
}
