import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Role } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  // Helper method to generates access and refresh tokens for the user
  private async getTokens(userId: number, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ), // 15 minutes
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ), // 60, "2 days", "10h", "7d"
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  // Helper method to hashes the password using bcrypt
  private async hashData(data: string): Promise<string> {
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(data, salt);
  }

  // Helper method to remove password from profile
  private async saveRefreshToken(userId: number, refreshToken: string) {
    // hash refresh token
    const hashedRefreshToken = await this.hashData(refreshToken);
    // save hashed refresh token in the database
    await this.profileRepository.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  // Method to sign in the user
  async signIn(createAuthDto: CreateAuthDto) {
    // check if the user exists in the database
    const foundUser = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'password', 'role'], // Include role in selection
    });
    if (!foundUser) {
      throw new NotFoundException(
        `User with email ${createAuthDto.email} not found`,
      );
    }
    // compare hashed password with the password provided
    const foundPassword = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );
    if (!foundPassword) {
      throw new NotFoundException('Invalid credentials');
    }
    // if correct generate tokens
    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    // save refresh token in the database
    await this.saveRefreshToken(foundUser.id, refreshToken);
    // return the tokens
    return {
      token: {
        accessToken,
        refreshToken,
      },
      user: {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role, // Include role in the response
      },
    };
  }

  // Method to sign out the user
  async signOut(userId: string) {
    // set user refresh token to null
    const res = await this.profileRepository.update(userId, {
      hashedRefreshToken: null,
    });

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { message: `User with id : ${userId} signed out successfully` };
  }

  // Method to refresh tokens
  async refreshTokens(id: number, refreshToken: string) {
    // get user
    const foundUser = await this.profileRepository.findOne({
      where: { id: id },
      select: ['id', 'email', 'role', 'hashedRefreshToken'], // Include role in selection
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!foundUser.hashedRefreshToken) {
      throw new NotFoundException('No refresh token found');
    }

    // check if the refresh token is valid
    const refreshTokenMatches = await Bcrypt.compare(
      refreshToken,
      foundUser.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new NotFoundException('Invalid refresh token');
    }
    // generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );
    // save new refresh token in the database
    await this.saveRefreshToken(foundUser.id, newRefreshToken);
    // return the new tokens
    return { accessToken, refreshToken: newRefreshToken };
  }

  // Method to register a new user
  async register(registerDto: RegisterDto) {
    // check if the user already exists
    const existingUser = await this.profileRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        `User with email ${registerDto.email} already exists`,
      );
    }
    // hash the password
    const hashedPassword = await this.hashData(registerDto.password);
    // create a new user
    const newUser = this.profileRepository.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: hashedPassword,
      role: Role.USER, // Default role for new users
    });
    // save the user to the database
    await this.profileRepository.save(newUser);
    // generate tokens for the new user
    const { accessToken, refreshToken } = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    // save refresh token in the database
    await this.saveRefreshToken(newUser.id, refreshToken);
    // return the tokens
    return { accessToken, refreshToken };
  }
}
