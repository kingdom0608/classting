import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { SchoolPageService } from '../../services';
import {
  CreateSchoolPageRequestType,
  SchoolPageResponseType,
} from '../../types';
import { ESchoolPageErrorMessage } from '@app/common';

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
