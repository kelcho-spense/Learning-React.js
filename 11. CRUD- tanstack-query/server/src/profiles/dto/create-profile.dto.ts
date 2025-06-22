import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
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
  @IsEnum(Role, {
    message:
      'Role must be one of the following: student, faculty, administrator',
  })
  role: Role = Role.GUEST; // Default role set to GUEST
}
