import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Blog, BlogStatus } from '../blogs/entities/blog.entity';
import { Profile, Role } from '../profiles/entities/profile.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    authorId: number,
  ): Promise<Comment> {
    const blog = await this.blogRepository.findOne({
      where: { id: createCommentDto.blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.status !== BlogStatus.APPROVED) {
      throw new ForbiddenException('You can only comment on approved blogs');
    }

    const author = await this.profileRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      blogId: createCommentDto.blogId,
      authorId,
    });

    return this.commentRepository.save(comment);
  }

  async findByBlog(blogId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { blogId },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'blog'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
    userRole: Role,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Check if user can update this comment
    if (userRole !== Role.ADMIN && comment.authorId !== userId) {
      throw new ForbiddenException('You can only update your own comments');
    }

    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: number, userId: number, userRole: Role): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Check if user can delete this comment
    if (userRole !== Role.ADMIN && comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentRepository.remove(comment);
  }
}
