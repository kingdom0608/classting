import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import {
  SchoolPageService,
  StudentService,
  StudentSubscriptionService,
} from '../../services';
import { ListSchoolPageRequestType, SchoolPageResponseType } from '../../types';

@ApiTags('[Public] schoolPage')
@Controller({
  path: 'public/school-pages',
})
export class PublicSchoolPageController {
  constructor(
    private readonly schoolPageService: SchoolPageService,
    private readonly studentService: StudentService,
    private readonly studentSubscriptionService: StudentSubscriptionService,
  ) {}

  @ApiOperation({
    summary: '학교 페이지 목록',
    description: '학교 페이지 목록',
  })
  @ApiOkResponse({ type: [SchoolPageResponseType] })
  @Get()
  async listSchoolPage(@Query() query: ListSchoolPageRequestType) {
    // TODO(@ahnjaesung): 유저 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학생 조회 */
    await this.studentService.getStudentById(query.studentId);

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
