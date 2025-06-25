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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AtGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Get('blog/:blogId')
  findByBlog(@Param('blogId') blogId: string) {
    return this.commentsService.findByBlog(+blogId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.update(
      +id,
      updateCommentDto,
      req.user.id,
      req.user.role,
    );
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(+id, req.user.id, req.user.role);
  }
}
