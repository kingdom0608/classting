import { InjectRepository } from '@nestjs/typeorm';
import { DOMAINS } from '@app/common';
import { Repository } from 'typeorm';
import { StudentSubscription } from '../entities';

export class StudentSubscriptionService {
  constructor(
    @InjectRepository(StudentSubscription, DOMAINS.School)
    private readonly studentSubscriptionRepository: Repository<StudentSubscription>,
  ) {}

  /**
   * 학교 페이지 구독 활성/비활성화
   * @param studentSubscriptionData
   */
  async createStudentSubscription(studentSubscriptionData: {
    studentId: number;
    schoolPageId: number;
    isSubscription: boolean;
  }) {
    if (studentSubscriptionData.isSubscription) {
      const findStudentSubscription =
        await this.studentSubscriptionRepository.findOne({
          where: {
            studentId: studentSubscriptionData.studentId,
            schoolPageId: studentSubscriptionData.schoolPageId,
          },
        });

      if (findStudentSubscription) {
        await this.studentSubscriptionRepository.update(
          {
            studentId: studentSubscriptionData.studentId,
            schoolPageId: studentSubscriptionData.schoolPageId,
          },
          {
            startDate: new Date(),
            endDate: null,
            isSubscription: true,
          },
        );
      } else {
        await this.studentSubscriptionRepository.save({
          ...studentSubscriptionData,
          startDate: new Date(),
          endDate: null,
          isSubscription: true,
        });
      }
    } else {
      await this.studentSubscriptionRepository.update(
        {
          studentId: studentSubscriptionData.studentId,
          schoolPageId: studentSubscriptionData.schoolPageId,
        },
        {
          endDate: new Date(),
          isSubscription: false,
        },
      );
    }

    return this.studentSubscriptionRepository.findOne({
      where: {
        studentId: studentSubscriptionData.studentId,
        schoolPageId: studentSubscriptionData.schoolPageId,
      },
    });
  }

  /**
   * 학생 구독 목록
   * @param studentId
   */
  async listStudentSubscriptionByStudentId(studentId: number) {
    return this.studentSubscriptionRepository.find({
      where: {
        studentId: studentId,
        isSubscription: true,
      },
    });
  }

  async listStudentSubscriptionByStudentIdForFeed(studentId: number) {
    return this.studentSubscriptionRepository.find({
      where: {
        studentId: studentId,
      },
    });
  }
}
