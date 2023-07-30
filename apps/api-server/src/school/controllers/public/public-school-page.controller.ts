import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SchoolPageService, StudentSubscriptionService } from '../../services';
import { ListSchoolPageRequestType, SchoolPageResponseType } from '../../types';

@ApiTags('[Public] schoolPage')
@Controller({
  path: 'public/school-pages',
})
export class PublicSchoolPageController {
  constructor(
    private readonly schoolPageService: SchoolPageService,
    private readonly studentSubscriptionService: StudentSubscriptionService,
  ) {}

  @ApiOperation({
    summary: '학교 페이지 목록',
    description: '학교 페이지 목록',
  })
  @ApiOkResponse({ type: [SchoolPageResponseType] })
  @Get()
  async listSchoolPage(@Query() query: ListSchoolPageRequestType) {
    const studentSubscriptions =
      await this.studentSubscriptionService.listStudentSubscriptionByStudentId(
        query.studentId,
      );

    /** 불필요한 값 삭제 */
    delete query.studentId;

    return await this.schoolPageService.listSchoolPageByIds({
      ...query,
      ids: studentSubscriptions.map((studentSubscription) => {
        return studentSubscription.schoolPageId;
      }),
    });
  }
}
