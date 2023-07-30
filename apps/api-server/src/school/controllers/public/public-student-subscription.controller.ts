import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { StudentSubscriptionService } from '../../services';
import {
  StudentSubscriptionResponseType,
  SubscriptionSchoolPageRequestType,
  UnsubscriptionSchoolPageRequestType,
} from '../../types';

@ApiTags('[Public] schoolPage')
@Controller({
  path: 'public/student-subscriptions',
})
export class PublicStudentSubscriptionController {
  constructor(
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
    return this.studentSubscriptionService.createStudentSubscription({
      ...unsubscriptionSchoolPageData,
      isSubscription: false,
    });
  }
}
