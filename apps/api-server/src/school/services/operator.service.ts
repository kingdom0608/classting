import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DOMAINS, ESchoolOperatorStatus } from '@app/common';
import { Repository } from 'typeorm';
import { Operator } from '../entities';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(Operator, DOMAINS.School)
    private readonly schoolOperatorRepository: Repository<Operator>,
  ) {}

  /**
   * 관리자 생성
   * @param operatorData
   */
  async createOperator(operatorData: { name: string }) {
    return this.schoolOperatorRepository.save({
      ...operatorData,
      status: ESchoolOperatorStatus.ACTIVE,
    });
  }
}
