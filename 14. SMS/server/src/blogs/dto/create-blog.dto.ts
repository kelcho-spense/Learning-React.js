import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { BlogStatus } from '../entities/blog.entity';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsEnum(BlogStatus)
  @IsOptional()
  status?: BlogStatus = BlogStatus.DRAFT;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
