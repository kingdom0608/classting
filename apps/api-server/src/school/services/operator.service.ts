import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DOMAINS,
  EOperatorErrorMessage,
  ESchoolOperatorStatus,
} from '@app/common';
import { Repository } from 'typeorm';
import { Operator } from '../entities';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(Operator, DOMAINS.School)
    private readonly operatorRepository: Repository<Operator>,
  ) {}

  /**
   * 관리자 생성
   * @param operatorData
   */
  async createOperator(operatorData: { name: string }) {
    return this.operatorRepository.save({
      ...operatorData,
      status: ESchoolOperatorStatus.ACTIVE,
    });
  }

  /**
   * 관리자 조회
   * @param id
   */
  async getOperatorById(id: number) {
    const findOperator = await this.operatorRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findOperator) {
      throw new NotFoundException(EOperatorErrorMessage.OPERATOR_NOT_FOUND);
    }

    return findOperator;
  }
}
