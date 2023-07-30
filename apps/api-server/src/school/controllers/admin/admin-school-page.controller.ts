import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ESchoolPageErrorMessage } from '@app/common';
import { SchoolPageService } from '../../services';
import {
  CreateSchoolPageRequestType,
  SchoolPageResponseType,
} from '../../types';

@ApiTags('[Admin] schoolPage')
@Controller({
  path: 'admin/school-pages',
})
export class AdminSchoolPageController {
  constructor(private readonly schoolPageService: SchoolPageService) {}

  @ApiOperation({
    summary: '어드민 학교 페이지 생성',
    description: '어드민 학교 페이지 생성',
  })
  @ApiOkResponse({ type: SchoolPageResponseType })
  @Post()
  async createSchoolPageForAdmin(
    @Body() schoolData: CreateSchoolPageRequestType,
  ) {
    // TODO(@ahnjaesung): 운영자 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학교 정보 확인 */
    const findSchool = await this.schoolPageService.getSchoolPageByNameLocation(
      schoolData.name,
      schoolData.location,
    );

    if (findSchool) {
      throw new ConflictException(ESchoolPageErrorMessage.SCHOOL_PAGE_CONFLICT);
    }

    /** 학교 페이지 생성 */
    return this.schoolPageService.createSchoolPage({
      name: schoolData.name,
      location: schoolData.location,
    });
  }
}
