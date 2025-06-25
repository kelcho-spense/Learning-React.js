import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AdminReviewBlogDto } from './dto/admin-review-blog.dto';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../profiles/entities/profile.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AtGuard)
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogsService.create(createBlogDto, req.user.id);
  }

  @Get()
  @UseGuards(AtGuard)
  findAll(@Request() req) {
    return this.blogsService.findAll(req.user.role, req.user.id);
  }

  @Get('my-blogs')
  @UseGuards(AtGuard)
  findMyBlogs(@Request() req) {
    return this.blogsService.findUserBlogs(req.user.id);
  }

  @Get('my-drafts')
  @UseGuards(AtGuard)
  findMyDrafts(@Request() req) {
    return this.blogsService.findUserDrafts(req.user.id);
  }

  @Get('pending')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findPendingBlogs() {
    return this.blogsService.findPendingBlogs();
  }

  @Get(':id')
  @UseGuards(AtGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.blogsService.findOne(+id, req.user.role, req.user.id);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req,
  ) {
    return this.blogsService.update(
      +id,
      updateBlogDto,
      req.user.id,
      req.user.role,
    );
  }

  @Patch(':id/submit-for-review')
  @UseGuards(AtGuard)
  submitForReview(@Param('id') id: string, @Request() req) {
    return this.blogsService.submitForReview(+id, req.user.id);
  }

  @Patch(':id/admin-review')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  adminReview(
    @Param('id') id: string,
    @Body() adminReviewDto: AdminReviewBlogDto,
  ) {
    return this.blogsService.adminReview(+id, adminReviewDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.blogsService.remove(+id, req.user.id, req.user.role);
  }
}
