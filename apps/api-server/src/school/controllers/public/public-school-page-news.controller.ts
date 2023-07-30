import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { ESchoolPageNewsStatus } from '@app/common';
import {
  SchoolPageNewsService,
  StudentService,
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
    private readonly studentService: StudentService,
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
    // TODO(@ahnjaesung): 유저 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학생 조회 */
    await this.studentService.getStudentById(query.studentId);

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
