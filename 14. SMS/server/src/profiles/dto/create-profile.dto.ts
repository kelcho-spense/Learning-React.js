import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../entities/profile.entity'; // Adjust the import path as necessary

export class CreateProfileDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'strongpassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    enum: Role,
    example: Role.USER,
    default: Role.USER,
  })
  @IsString()
  @IsEnum(Role, {
    message: 'Role must be one of the following: user, admin',
  })
  role: Role = Role.USER; // Default role set to USER
}
