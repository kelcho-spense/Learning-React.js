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
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // http://localhost:8000/students
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // http://localhost:8000/students?name=John
  @Get()
  findAll(@Query('name') name?: string) {
    return this.studentsService.findAll(name);
  }

  // http://localhost:8000/students/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  // http://localhost:8000/students/1
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  // http://localhost:8000/students/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }

  // http://localhost:8000/students/1/courses
  @Get(':id/courses')
  getStudentCourses(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudentCourses(id);
  }

  // http://localhost:8000/students/1/courses/2
  @Post(':studentId/courses/:courseId')
  enrollStudentInCourse(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.studentsService.enrollStudentInCourse(studentId, courseId);
  }

  // http://localhost:8000/students/1/courses/2
  @Delete(':studentId/courses/:courseId')
  unenrollStudentFromCourse(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.studentsService.unenrollStudentFromCourse(studentId, courseId);
  }

  // http://localhost:8000/students/1/courses
  @Patch(':id/courses')
  updateStudentCourses(
    @Param('id', ParseIntPipe) id: number,
    @Body() courseIds: number[],
  ) {
    return this.studentsService.updateStudentCourses(id, courseIds);
  }
}
