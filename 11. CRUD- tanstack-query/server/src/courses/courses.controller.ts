import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // http://localhost:3000/courses
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  // http://localhost:3000/courses?search=Math
  @Get()
  findAll(@Query('search') search?: string) {
    return this.coursesService.findAll(search);
  }

  // http://localhost:3000/courses/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  // http://localhost:3000/courses/1
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  // http://localhost:3000/courses/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  // Endpoints for managing course enrollments

  // http://localhost:3000/courses/1/students
  @Get(':id/students')
  getEnrolledStudents(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.getEnrolledStudents(id);
  }

  // http://localhost:3000/courses/1/students/2
  @Post(':courseId/students/:studentId')
  addStudentToCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.coursesService.addStudentToCourse(courseId, studentId);
  }

  // http://localhost:3000/courses/1/students/2
  @Delete(':courseId/students/:studentId')
  removeStudentFromCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.coursesService.removeStudentFromCourse(courseId, studentId);
  }
}
