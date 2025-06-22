import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.save(createDepartmentDto);
  }

  findAll(search?: string) {
    if (search) {
      return this.departmentRepository.find({
        where: [{ name: `%${search}%` }, { description: `%${search}%` }],
        relations: ['courses'],
      });
    }
    return this.departmentRepository.find({
      relations: ['courses'],
    });
  }

  findOne(id: number) {
    return this.departmentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
