import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import {
  SchoolPageService,
  StudentService,
  StudentSubscriptionService,
} from '../../services';
import {
  StudentSubscriptionResponseType,
  SubscriptionSchoolPageRequestType,
  UnsubscriptionSchoolPageRequestType,
} from '../../types';

@ApiTags('[Public] schoolPage')
@Controller({
  path: 'public/school-pages',
})
export class PublicStudentSubscriptionController {
  constructor(
    private readonly schoolPageService: SchoolPageService,
    private readonly studentService: StudentService,
    private readonly studentSubscriptionService: StudentSubscriptionService,
  ) {}

  @ApiOperation({
    summary: '학생 학교 페이지 구독',
    description: '학생 학교 페이지 구독',
  })
  @ApiOkResponse({ type: StudentSubscriptionResponseType })
  @Post('subscription')
  async subscriptionSchoolPage(
    @Body() subscriptionSchoolPageData: SubscriptionSchoolPageRequestType,
  ) {
    // TODO(@ahnjaesung): 유저 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학생 조회 */
    await this.studentService.getStudentById(
      subscriptionSchoolPageData.studentId,
    );

    /** 학교 페이지 조회 */
    await this.schoolPageService.getSchoolPageById(
      subscriptionSchoolPageData.schoolPageId,
    );

    return this.studentSubscriptionService.createStudentSubscription({
      ...subscriptionSchoolPageData,
      isSubscription: true,
    });
  }

  @ApiOperation({
    summary: '학생 학교 페이지 구독 취소',
    description: '학생 학교 페이지 구독 취소',
  })
  @ApiOkResponse({ type: StudentSubscriptionResponseType })
  @Post('unsubscription')
  async unsubscriptionSchoolPage(
    @Body() unsubscriptionSchoolPageData: UnsubscriptionSchoolPageRequestType,
  ) {
    // TODO(@ahnjaesung): 유저 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학생 조회 */
    await this.studentService.getStudentById(
      unsubscriptionSchoolPageData.studentId,
    );

    /** 학교 페이지 조회 */
    await this.schoolPageService.getSchoolPageById(
      unsubscriptionSchoolPageData.schoolPageId,
    );

    return this.studentSubscriptionService.createStudentSubscription({
      ...unsubscriptionSchoolPageData,
      isSubscription: false,
    });
  }
}
