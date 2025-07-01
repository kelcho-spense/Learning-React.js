import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Blog } from '../blogs/entities/blog.entity';
import { Comment } from '../comments/entities/comment.entity';
import { RolesGuard } from 'src/auth/guards';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Blog, Comment])],
  controllers: [ProfilesController],
  providers: [ProfilesService, RolesGuard],
  exports: [ProfilesService],
})
export class ProfileModule {}
