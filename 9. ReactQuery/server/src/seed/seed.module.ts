import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Student } from '../students/entities/student.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Department } from '../departments/entities/department.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Profile, Department, Course])],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
