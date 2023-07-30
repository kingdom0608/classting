import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DOMAINS,
  ESchoolPageNewsErrorMessage,
  ESchoolPageNewsStatus,
  findPagination,
  IFindPaginationQuery,
  responsePagination,
} from '@app/common';
import { Between, In, Repository } from 'typeorm';
import { SchoolPageNews } from '../entities';

export interface IListSchoolPageNews extends IFindPaginationQuery {
  schoolPageId: number;
  status: ESchoolPageNewsStatus;
}

export interface IListSchoolPageNewsFeed extends IFindPaginationQuery {
  ids: Array<number>;
  createDate?: any;
}

@Injectable()
export class SchoolPageNewsService {
  constructor(
    @InjectRepository(SchoolPageNews, DOMAINS.School)
    private readonly schoolPageNewsRepository: Repository<SchoolPageNews>,
  ) {}

  /**
   * 학교 페이지 뉴스 생성
   * @param schoolPageNewsData
   */
  async createSchoolPageNews(schoolPageNewsData: {
    schoolPageId: number;
    content: string;
  }) {
    return this.schoolPageNewsRepository.save({
      ...schoolPageNewsData,
      status: ESchoolPageNewsStatus.ACTIVE,
    });
  }

  /**
   * 학교 페이지 뉴스 id 조회
   * @param id
   */
  async getSchoolPageNewsById(id: number) {
    const findSchoolPageNews = await this.schoolPageNewsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findSchoolPageNews) {
      throw new NotFoundException(
        ESchoolPageNewsErrorMessage.SCHOOL_PAGE_NEWS_NOT_FOUND,
      );
    }

    return findSchoolPageNews;
  }

  /**
   * 학교 페이지 뉴스 목록
   * @param query
   */
  async listSchoolPageNews(query: IListSchoolPageNews) {
    const { offset, page, size, sortBy, ...data } = query;
    const where = {
      ...data,
    };

    const [list, total] = await this.schoolPageNewsRepository.findAndCount({
      where: where,
      ...findPagination({ offset, page, size, sortBy }),
    });

    const pagination = responsePagination(total, list.length, query);

    return { list: list, pagination: pagination };
  }

  /**
   * 학교 페이지 뉴스 피드 목록
   * @param query
   */
  async listSchoolPageNewsFeed(query: IListSchoolPageNewsFeed) {
    const { offset, page, size, sortBy, ...data } = query;
    const where: any = {
      ...data,
    };

    if (data.ids) {
      delete where.ids;
      where.id = In(data.ids);
    }

    const [list, total] = await this.schoolPageNewsRepository.findAndCount({
      where: where,
      ...findPagination({ offset, page, size, sortBy }),
    });

    const pagination = responsePagination(total, list.length, query);

    return { list: list, pagination: pagination };
  }

  /**
   * 학교 페이지 아이디 목록
   * @param schoolPageId
   * @param startDate
   * @param endDate
   */
  async listSchoolPageBySchoolPageId(
    schoolPageId: number,
    startDate: Date,
    endDate?: Date,
  ) {
    return this.schoolPageNewsRepository.find({
      select: ['id'],
      where: {
        schoolPageId: schoolPageId,
        createDate: Between(startDate, endDate || new Date()),
      },
    });
  }

  /**
   * 학교 페이지 뉴스 업데이트
   * @param id
   * @param schoolPageNewsData
   */
  async updateSchoolPageNewsById(
    id: number,
    schoolPageNewsData: {
      content: string;
    },
  ) {
    /** 학교 페이지 뉴스 존재 확인 */
    await this.getSchoolPageNewsById(id);

    /** 학교 페이지 업데이트 */
    await this.schoolPageNewsRepository.update(
      {
        id: id,
      },
      {
        ...schoolPageNewsData,
      },
    );

    return this.getSchoolPageNewsById(id);
  }

  /**
   * 학교 페이지 뉴스 삭제
   * @param id
   */
  async deleteSchoolPageNewsById(id: number) {
    const findSchoolPageNews = await this.getSchoolPageNewsById(id);

    await this.schoolPageNewsRepository.softDelete({
      id: id,
    });

    return findSchoolPageNews;
  }
}
