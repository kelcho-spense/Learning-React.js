import {
  IsString,
  IsDateString,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateStudentDto {
  @IsDateString()
  enrollmentDate: string;

  @IsString()
  @IsOptional()
  degreeProgram?: string;

  @IsNumber()
  @Min(0)
  @Max(4.0)
  @IsOptional()
  gpa?: number;

  @IsInt()
  @IsOptional()
  departmentId?: number;

  @IsNumber()
  profileId: number; // Assuming profileId is a string, adjust if it's a number or UUID
}
