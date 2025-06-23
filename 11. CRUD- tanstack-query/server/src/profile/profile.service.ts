import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      // Check if email already exists
      const existingProfile = await this.profileRepository.findOne({
        where: { email: createProfileDto.email },
      });

      if (existingProfile) {
        throw new ConflictException(
          `Profile with email ${createProfileDto.email} already exists`,
        );
      }

      // Create new profile
      const profile = this.profileRepository.create(createProfileDto);
      const savedProfile = await this.profileRepository.save(profile);

      // Remove password from response for security
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = savedProfile;
      return result as Profile;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to create profile');
    }
  }

  async findAll(): Promise<Profile[]> {
    try {
      const profiles = await this.profileRepository.find({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'role',
          'createdAt',
          'updatedAt',
        ],
        order: { createdAt: 'DESC' },
      });
      return profiles;
    } catch {
      throw new BadRequestException('Failed to fetch profiles');
    }
  }

  async findOne(id: number): Promise<Profile> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid profile ID');
      }

      const profile = await this.profileRepository.findOne({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'role',
          'createdAt',
          'updatedAt',
        ],
      });

      if (!profile) {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }

      return profile;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch profile');
    }
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid profile ID');
      }

      const profile = await this.findOne(id);

      // If email is being updated, check for conflicts
      if (updateProfileDto.email && updateProfileDto.email !== profile.email) {
        const existingProfile = await this.profileRepository.findOne({
          where: { email: updateProfileDto.email },
        });

        if (existingProfile) {
          throw new ConflictException(
            `Profile with email ${updateProfileDto.email} already exists`,
          );
        }
      }

      // Update the profile
      await this.profileRepository.update(id, updateProfileDto);

      // Return the updated profile
      return this.findOne(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update profile');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid profile ID');
      }

      const profile = await this.findOne(id);

      await this.profileRepository.remove(profile);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to delete profile');
    }
  }
}
