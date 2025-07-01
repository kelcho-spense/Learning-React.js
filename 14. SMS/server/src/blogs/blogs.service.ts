import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AdminReviewBlogDto } from './dto/admin-review-blog.dto';
import { Blog, BlogStatus } from './entities/blog.entity';
import { Profile, Role } from '../profiles/entities/profile.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createBlogDto: CreateBlogDto, authorId: number): Promise<Blog> {
    const author = await this.profileRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const blog = this.blogRepository.create({
      ...createBlogDto,
      authorId,
      status: BlogStatus.DRAFT,
    });

    return this.blogRepository.save(blog);
  }

  async findAll(userRole?: Role, userId?: number): Promise<Blog[]> {
    const queryBuilder = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author');

    if (userRole === Role.ADMIN || userRole === Role.SUPER_ADMIN) {
      // Admin and Super Admin can see all blogs
      return queryBuilder.getMany();
    } else {
      // Regular users can only see approved blogs or their own blogs
      queryBuilder.where(
        '(blog.status = :approvedStatus OR (blog.authorId = :userId))',
        { approvedStatus: BlogStatus.APPROVED, userId },
      );
      return queryBuilder.getMany();
    }
  }

  async findUserBlogs(userId: number): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { authorId: userId },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findUserDrafts(userId: number): Promise<Blog[]> {
    return this.blogRepository.find({
      where: {
        authorId: userId,
        status: BlogStatus.DRAFT,
      },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findPendingBlogs(): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { status: BlogStatus.PENDING },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userRole?: Role, userId?: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user can access this blog
    if (
      userRole !== Role.ADMIN &&
      userRole !== Role.SUPER_ADMIN &&
      blog.status !== BlogStatus.APPROVED &&
      blog.authorId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to view this blog',
      );
    }

    // Increment view count for approved blogs
    if (blog.status === BlogStatus.APPROVED) {
      blog.viewCount += 1;
      await this.blogRepository.save(blog);
    }

    return blog;
  }

  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    userId: number,
    userRole: Role,
  ): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user can update this blog
    if (
      userRole !== Role.ADMIN &&
      userRole !== Role.SUPER_ADMIN &&
      blog.authorId !== userId
    ) {
      throw new ForbiddenException('You can only update your own blogs');
    }

    // If user is updating their own blog and it was rejected, reset status to draft
    if (
      userRole !== Role.ADMIN &&
      userRole !== Role.SUPER_ADMIN &&
      blog.status === BlogStatus.REJECTED
    ) {
      updateBlogDto.status = BlogStatus.DRAFT;
    }

    Object.assign(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  async submitForReview(id: number, userId: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.authorId !== userId) {
      throw new ForbiddenException(
        'You can only submit your own blogs for review',
      );
    }

    if (blog.status !== BlogStatus.DRAFT) {
      throw new ForbiddenException(
        'Only draft blogs can be submitted for review',
      );
    }

    blog.status = BlogStatus.PENDING;
    return this.blogRepository.save(blog);
  }

  async adminReview(
    id: number,
    adminReviewDto: AdminReviewBlogDto,
  ): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    blog.status = adminReviewDto.status;
    if (adminReviewDto.adminReviewMessage) {
      blog.adminReviewMessage = adminReviewDto.adminReviewMessage;
    }

    if (adminReviewDto.status === BlogStatus.APPROVED) {
      blog.publishedAt = new Date();
    }

    return this.blogRepository.save(blog);
  }

  async remove(id: number, userId: number, userRole: Role): Promise<void> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user can delete this blog
    if (
      userRole !== Role.ADMIN &&
      userRole !== Role.SUPER_ADMIN &&
      blog.authorId !== userId
    ) {
      throw new ForbiddenException('You can only delete your own blogs');
    }

    await this.blogRepository.remove(blog);
  }
}
