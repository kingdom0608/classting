import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DOMAINS, EStudentStatus } from '@app/common';
import { Repository } from 'typeorm';
import { Student } from '../entities';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student, DOMAINS.School)
    private readonly studentRepository: Repository<Student>,
  ) {}

  /**
   * 학생 생성
   * @param StudentData
   */
  async createStudent(StudentData: { name: string }) {
    return this.studentRepository.save({
      ...StudentData,
      status: EStudentStatus.ACTIVE,
    });
  }
}
