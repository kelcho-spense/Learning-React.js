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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AtGuard } from '../auth/guards/at.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from '../profiles/entities/profile.entity';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    role: Role;
    refreshToken: string;
  };
}

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.commentsService.create(createCommentDto, req.user.sub);
  }

  @Get('blog/:blogId')
  @ApiOperation({ summary: 'Get comments by blog ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved comments.' })
  @ApiResponse({ status: 404, description: 'Comments not found.' })
  findByBlog(@Param('blogId') blogId: string) {
    return this.commentsService.findByBlog(+blogId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.commentsService.update(
      +id,
      updateCommentDto,
      req.user.sub,
      req.user.role,
    );
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.commentsService.remove(+id, req.user.sub, req.user.role);
  }
}
