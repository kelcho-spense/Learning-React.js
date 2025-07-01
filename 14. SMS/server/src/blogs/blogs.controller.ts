import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AdminReviewBlogDto } from './dto/admin-review-blog.dto';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../profiles/entities/profile.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    role: Role;
    refreshToken: string;
  };
}

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: RequestWithUser) {
    return this.blogsService.create(createBlogDto, req.user.sub);
  }

  @Get()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Retrieve all blogs' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all blogs.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Req() req: RequestWithUser) {
    return this.blogsService.findAll(req.user.role, req.user.sub);
  }

  @Get('my-blogs')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Retrieve all blogs by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user blogs.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findMyBlogs(@Req() req: RequestWithUser) {
    return this.blogsService.findUserBlogs(req.user.sub);
  }

  @Get('my-drafts')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Retrieve all drafts by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user drafts.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findMyDrafts(@Req() req: RequestWithUser) {
    return this.blogsService.findUserDrafts(req.user.sub);
  }

  @Get('pending')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Retrieve all pending blogs' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved pending blogs.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findPendingBlogs() {
    return this.blogsService.findPendingBlogs();
  }

  @Get(':id')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Retrieve a specific blog by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the blog.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.blogsService.findOne(+id, req.user.role, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Update a specific blog by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated the blog.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req: RequestWithUser,
  ) {
    return this.blogsService.update(
      +id,
      updateBlogDto,
      req.user.sub,
      req.user.role,
    );
  }

  @Patch(':id/submit-for-review')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Submit a blog for review' })
  @ApiResponse({
    status: 200,
    description: 'Successfully submitted the blog for review.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  submitForReview(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.blogsService.submitForReview(+id, req.user.sub);
  }

  @Patch(':id/admin-review')
  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Admin review of a blog' })
  @ApiResponse({ status: 200, description: 'Successfully reviewed the blog.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  adminReview(
    @Param('id') id: string,
    @Body() adminReviewDto: AdminReviewBlogDto,
  ) {
    return this.blogsService.adminReview(+id, adminReviewDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Delete a specific blog by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the blog.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.blogsService.remove(+id, req.user.sub, req.user.role);
  }
}
