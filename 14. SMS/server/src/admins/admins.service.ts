import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Profile, Role } from '../profiles/entities/profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findAllUsers(): Promise<Profile[]> {
    return this.profileRepository.find({
      where: { role: Role.USER },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllAdmins(): Promise<Profile[]> {
    return this.profileRepository.find({
      where: { role: Role.ADMIN },
      order: { createdAt: 'DESC' },
    });
  }

  async findUserById(id: number): Promise<Profile> {
    const user = await this.profileRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async activateUser(id: number): Promise<Profile> {
    const user = await this.profileRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = true;
    return this.profileRepository.save(user);
  }

  async deactivateUser(id: number): Promise<Profile> {
    const user = await this.profileRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;
    return this.profileRepository.save(user);
  }

  async resetUserPassword(id: number, newPassword: string): Promise<Profile> {
    const user = await this.profileRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    return this.profileRepository.save(user);
  }

  async getUserStats(): Promise<any> {
    const totalUsers = await this.profileRepository.count({
      where: { role: Role.USER },
    });
    const activeUsers = await this.profileRepository.count({
      where: { role: Role.USER, isActive: true },
    });
    const inactiveUsers = await this.profileRepository.count({
      where: { role: Role.USER, isActive: false },
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
    };
  }
}
