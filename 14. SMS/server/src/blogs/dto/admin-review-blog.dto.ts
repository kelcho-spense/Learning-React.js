import { IsString, IsEnum, IsOptional } from 'class-validator';
import { BlogStatus } from '../entities/blog.entity';

export class AdminReviewBlogDto {
  @IsEnum(BlogStatus)
  status: BlogStatus;

  @IsString()
  @IsOptional()
  adminReviewMessage?: string;
}
