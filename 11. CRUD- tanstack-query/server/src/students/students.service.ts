import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository, In } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // if profile id exists, we need to check if the profile is already associated with a student
    const existingProfile = await this.profileRepository.findOneBy({
      id: createStudentDto.profileId,
    });

    if (!existingProfile) {
      throw new NotFoundException(
        `Profile with ID ${createStudentDto.profileId} not found`,
      );
    }
    // Create a new Student entity with the profile relation
    const newStudent = this.studentRepository.create({
      enrollmentDate: createStudentDto.enrollmentDate,
      degreeProgram: createStudentDto.degreeProgram,
      gpa: createStudentDto.gpa,
      profile: existingProfile,
    });

    return this.studentRepository.save(newStudent);
  }

  async findAll(name?: string): Promise<Student[] | Student> {
    if (name) {
      return await this.studentRepository.find({
        where: {
          profile: {
            firstName: name,
          },
        },
        relations: ['profile', 'courses'], // Added courses relation
      });
    }
    return await this.studentRepository.find({
      relations: ['profile', 'courses'], // Added courses relation
    });
  }

  async findOne(id: number): Promise<Student | string> {
    return await this.studentRepository
      .findOne({
        where: { id },
        relations: ['profile', 'courses'], // Added courses relation
      })
      .then((student) => {
        if (!student) {
          return `No student found with id ${id}`;
        }
        return student;
      })
      .catch((error) => {
        console.error('Error finding student:', error);
        throw new Error(`Failed to find student with id ${id}`);
      });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository
      .update(id, updateStudentDto)
      .then((result) => {
        if (result.affected === 0) {
          return `No student found with id ${id}`;
        }
      })
      .catch((error) => {
        console.error('Error updating student:', error);
        throw new Error(`Failed to update student with id ${id}`);
      });
  }

  async remove(id: number): Promise<string> {
    return await this.studentRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `No student found with id ${id}`;
        }
        return `Student with id ${id} has been removed`;
      })
      .catch((error) => {
        console.error('Error removing student:', error);
        throw new Error(`Failed to remove student with id ${id}`);
      });
  }

  async enrollStudentInCourse(
    studentId: number,
    courseId: number,
  ): Promise<Student> {
    // Find the student with courses relation
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Find the course
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Initialize courses array if it doesn't exist
    if (!student.courses) {
      student.courses = [];
    }

    // Check if already enrolled
    const isAlreadyEnrolled = student.courses.some(
      (enrolledCourse) => enrolledCourse.id === courseId,
    );

    if (!isAlreadyEnrolled) {
      student.courses.push(course);
      await this.studentRepository.save(student);
    }

    return student;
  }

  async unenrollStudentFromCourse(
    studentId: number,
    courseId: number,
  ): Promise<Student> {
    // Find the student with courses relation
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Check if the student is enrolled in the course
    if (!student.courses || student.courses.length === 0) {
      throw new NotFoundException(
        `Student with ID ${studentId} is not enrolled in any courses`,
      );
    }

    // Filter out the course to unenroll from
    student.courses = student.courses.filter(
      (course) => course.id !== courseId,
    );

    // Save the updated student
    return this.studentRepository.save(student);
  }

  async getStudentCourses(studentId: number): Promise<Course[]> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return student.courses || [];
  }

  async updateStudentCourses(
    studentId: number,
    courseIds: number[],
  ): Promise<Student> {
    // Find the student with courses relation
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Find all courses by IDs
    const courses = await this.courseRepository.findBy({
      id: In(courseIds),
    });

    if (courses.length !== courseIds.length) {
      const foundIds = courses.map((course) => course.id);
      const missingIds = courseIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Courses with IDs ${missingIds.join(', ')} not found`,
      );
    }

    // Replace student's courses with the new selection
    student.courses = courses;

    // Save the updated student
    return this.studentRepository.save(student);
  }
}
