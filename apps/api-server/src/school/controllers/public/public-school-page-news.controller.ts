import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ESchoolPageNewsStatus } from '@app/common';
import {
  SchoolPageNewsService,
  StudentSubscriptionService,
} from '../../services';
import {
  ListSchoolPageNewsFeedRequestType,
  ListSchoolPageNewsRequestType,
  SchoolPageNewsResponseType,
} from '../../types';

@ApiTags('[Public] schoolPage')
@Controller({
  path: 'public/school-page-news',
})
export class PublicSchoolPageNewsController {
  constructor(
    private readonly schoolPageNewsService: SchoolPageNewsService,
    private readonly studentSubscriptionService: StudentSubscriptionService,
  ) {}

  @ApiOperation({
    summary: '학교 페이지 뉴스 목록',
    description: '학교 페이지 뉴스 목록',
  })
  @ApiOkResponse({ type: [SchoolPageNewsResponseType] })
  @Get()
  async listSchoolPageNews(@Query() query: ListSchoolPageNewsRequestType) {
    return this.schoolPageNewsService.listSchoolPageNews({
      ...query,
      status: ESchoolPageNewsStatus.ACTIVE,
    });
  }

  @ApiOperation({
    summary: '학교 페이지 뉴스 피드 목록',
    description: '학교 페이지 뉴스 피드 목록',
  })
  @ApiOkResponse({ type: [SchoolPageNewsResponseType] })
  @Get('feed')
  async listSchoolPageNewsFeed(
    @Query() query: ListSchoolPageNewsFeedRequestType,
  ) {
    const studentSubscriptions =
      await this.studentSubscriptionService.listStudentSubscriptionByStudentIdForFeed(
        query.studentId,
      );

    const schoolPageNewsIds = [];
    for (const row of studentSubscriptions) {
      const studentSubscriptions =
        await this.schoolPageNewsService.listSchoolPageBySchoolPageId(
          row.schoolPageId,
          row.startDate,
          row.endDate,
        );

      studentSubscriptions.map((data) => {
        schoolPageNewsIds.push(data.id);
      });
    }

    /** 불필요한 값 삭제 */
    delete query.studentId;

    return this.schoolPageNewsService.listSchoolPageNewsFeed({
      ...query,
      ids: schoolPageNewsIds,
    });
  }
}
