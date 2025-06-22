import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository, Like } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    // Find the department
    const department = await this.departmentRepository.findOne({
      where: { id: createCourseDto.departmentId },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${createCourseDto.departmentId} not found`,
      );
    }

    // Create a new course instance
    const newCourse = this.courseRepository.create({
      title: createCourseDto.title,
      description: createCourseDto.description,
      credits: createCourseDto.credits,
      duration: createCourseDto.duration,
      startDate: createCourseDto.startDate,
      endDate: createCourseDto.endDate,
      department: department, // Assign the actual department entity
    });

    // Save the course to the database
    return this.courseRepository.save(newCourse);
  }

  async findAll(search?: string): Promise<Course[]> {
    if (search) {
      return this.courseRepository.find({
        where: [
          { title: Like(`%${search}%`) },
          { description: Like(`%${search}%`) },
        ],
        relations: ['department', 'students'],
      });
    }
    return this.courseRepository.find({
      relations: ['department', 'students'],
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['department', 'students'], // Added students relation
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // First check if the course exists
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['department'], // Add relations to properly update
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // If departmentId is provided, find the department
    if (updateCourseDto.departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: updateCourseDto.departmentId },
      });

      if (!department) {
        throw new NotFoundException(
          `Department with ID ${updateCourseDto.departmentId} not found`,
        );
      }

      // Assign the department entity
      course.department = department;
    }

    // Update the course properties
    if (updateCourseDto.title) course.title = updateCourseDto.title;
    if (updateCourseDto.description)
      course.description = updateCourseDto.description;
    if (updateCourseDto.credits) course.credits = updateCourseDto.credits;
    if (updateCourseDto.duration) course.duration = updateCourseDto.duration;
    if (updateCourseDto.startDate) course.startDate = updateCourseDto.startDate;
    if (updateCourseDto.endDate) course.endDate = updateCourseDto.endDate;

    // Save the updated course
    await this.courseRepository.save(course);

    // Return the updated course
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.courseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  // New methods for managing course enrollments

  async getEnrolledStudents(courseId: number): Promise<Student[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students', 'students.profile'], // Include profile information
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return course.students || [];
  }

  async addStudentToCourse(
    courseId: number,
    studentId: number,
  ): Promise<Course> {
    // Find the course with students relation
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Find the student
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Initialize students array if it doesn't exist
    if (!course.students) {
      course.students = [];
    }

    // Check if student is already enrolled
    const isAlreadyEnrolled = course.students.some(
      (enrolledStudent) => enrolledStudent.id === studentId,
    );

    if (!isAlreadyEnrolled) {
      course.students.push(student);
      await this.courseRepository.save(course);
    }

    return course;
  }

  async removeStudentFromCourse(
    courseId: number,
    studentId: number,
  ): Promise<Course> {
    // Find the course with students relation
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if the course has any enrolled students
    if (!course.students || course.students.length === 0) {
      throw new NotFoundException(
        `Course with ID ${courseId} has no enrolled students`,
      );
    }

    // Filter out the student to remove
    course.students = course.students.filter(
      (student) => student.id !== studentId,
    );

    // Save the updated course
    return this.courseRepository.save(course);
  }
}
