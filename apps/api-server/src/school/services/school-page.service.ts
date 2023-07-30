import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DOMAINS,
  ESchoolPageErrorMessage,
  ESchoolPageLocation,
  ESchoolPageStatus,
  findPagination,
  IFindPaginationQuery,
  responsePagination,
} from '@app/common';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { SchoolPage, SchoolPageNews, StudentSubscription } from '../entities';

export interface IListSchoolPageQuery extends IFindPaginationQuery {
  ids: Array<number>;
}

@Injectable()
export class SchoolPageService {
  constructor(
    @InjectDataSource(DOMAINS.School)
    private readonly dataSource: DataSource,
    @InjectRepository(SchoolPage, DOMAINS.School)
    private readonly schoolPageRepository: Repository<SchoolPage>,
    @InjectRepository(StudentSubscription, DOMAINS.School)
    private readonly studentSubscriptionRepository: Repository<StudentSubscription>,
  ) {}

  /**
   * 학교 페이지 생성
   * @param schoolPageData
   */
  async createSchoolPage(schoolPageData: {
    name: string;
    location: ESchoolPageLocation;
  }) {
    return this.schoolPageRepository.save({
      ...schoolPageData,
      status: ESchoolPageStatus.ACTIVE,
    });
  }

  /**
   * 학교 페이지 id 조회
   * @param id
   */
  async getSchoolPageById(id: number) {
    const findSchoolPage = await this.schoolPageRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findSchoolPage) {
      throw new NotFoundException(
        ESchoolPageErrorMessage.SCHOOL_PAGE_NOT_FOUND,
      );
    }

    return findSchoolPage;
  }

  /**
   * 학교 페이지 이름 위치 조회
   * @param name
   * @param location
   */
  async getSchoolPageByNameLocation(
    name: string,
    location: ESchoolPageLocation,
  ) {
    return this.schoolPageRepository.findOne({
      where: {
        name: name,
        location: location,
      },
    });
  }

  /**
   * 학교 페이지 리스트
   * @param query
   */
  async listSchoolPageByIds(query: IListSchoolPageQuery) {
    const { offset, page, size, sortBy, ...data } = query;
    const where: any = {
      ...data,
    };

    if (data.ids) {
      delete where.ids;
      where.id = In(data.ids);
    }

    const [list, total] = await this.schoolPageRepository.findAndCount({
      where: where,
      ...findPagination({ offset, page, size, sortBy }),
    });

    const pagination = responsePagination(total, list.length, query);

    return { list: list, pagination: pagination };
  }

  /**
   * 학교 페이지 삭제
   * @param id
   */
  async deleteSchoolPageById(id: number) {
    const findSchoolPage = await this.getSchoolPageById(id);

    await this.dataSource.transaction(async (manager: EntityManager) => {
      /** 학교 페이지 삭제 */
      await manager.softDelete(SchoolPage, {
        id: id,
      });

      await manager.softDelete(SchoolPageNews, {
        schoolPageId: id,
      });
    });

    return findSchoolPage;
  }
}
