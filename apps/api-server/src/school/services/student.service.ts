import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DOMAINS, EStudentErrorMessage, EStudentStatus } from '@app/common';
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

  /**
   * 학생 조회
   * @param id
   */
  async getStudentById(id: number) {
    const findStudent = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findStudent) {
      throw new NotFoundException(EStudentErrorMessage.STUDENT_NOT_FOUND);
    }

    return findStudent;
  }
}
