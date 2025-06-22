import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profileRepository
      .save(createProfileDto)
      .catch((error) => {
        console.error('Error creating profile:', error);
        throw new Error('Failed to create profile');
      });
  }

  async findAll(email?: string) {
    if (email) {
      return await this.profileRepository.find({
        where: {
          email: email,
        },
        relations: ['student'], // Ensure to load the student relation
      });
    }
    return this.profileRepository.find({
      relations: ['student'], // Ensure to load the student relation
    });
  }

  async findOne(id: number): Promise<Profile | string> {
    return await this.profileRepository
      .findOneBy({ id })
      .then((profile) => {
        if (!profile) {
          return `No profile found with id ${id}`;
        }
        return profile;
      })
      .catch((error) => {
        console.error('Error finding profile:', error);
        throw new Error(`Failed to find profile with id ${id}`);
      });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile | string> {
    await this.profileRepository.update(id, updateProfileDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    return await this.profileRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No profile found with id ${id}`;
        }
        return `Profile with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing profile:', error);
        throw new Error(`Failed to remove profile with id ${id}`);
      });
  }
}
