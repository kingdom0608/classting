import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { SchoolPageNewsService, SchoolPageService } from '../../services';
import {
  CreateSchoolPageNewsRequestType,
  SchoolPageNewsResponseType,
  UpdateSchoolPageNewsRequestType,
} from '../../types';

@ApiTags('[Admin] schoolPage')
@Controller({
  path: 'admin/school-page-news',
})
export class AdminSchoolPageNewsController {
  constructor(
    private readonly schoolPageService: SchoolPageService,
    private readonly schoolPageNewsService: SchoolPageNewsService,
  ) {}

  @ApiOperation({
    summary: '어드민 학교 페이지 뉴스 생성',
    description: '어드민 학교 페이지 뉴스 생성',
  })
  @ApiOkResponse({ type: SchoolPageNewsResponseType })
  @Post()
  async createSchoolPageNewsForAdmin(
    @Body() schoolData: CreateSchoolPageNewsRequestType,
  ) {
    // TODO(@ahnjaesung): 운영자 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    /** 학교 페이지 정보 확인 */
    await this.schoolPageService.getSchoolPageById(schoolData.schoolPageId);

    /** 학교 페이지 뉴스 생성 */
    return this.schoolPageNewsService.createSchoolPageNews({
      ...schoolData,
    });
  }

  @ApiOperation({
    summary: '어드민 학교 페이지 뉴스 수정',
    description: '어드민 학교 페이지 뉴스 수정',
  })
  @ApiOkResponse({ type: SchoolPageNewsResponseType })
  @Put('id/:id')
  async updateAdminSchoolPageNewsForAdmin(
    @Param('id') id: number,
    @Body() schoolPageNewsData: UpdateSchoolPageNewsRequestType,
  ) {
    // TODO(@ahnjaesung): 운영자 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    return this.schoolPageNewsService.updateSchoolPageNewsById(id, {
      ...schoolPageNewsData,
    });
  }

  @ApiOperation({
    summary: '어드민 학교 페이지 뉴스 삭제',
    description: '어드민 학교 페이지 뉴스 삭제',
  })
  @ApiOkResponse({ type: SchoolPageNewsResponseType })
  @Delete('id/:id')
  async deleteSchoolPageNewsForAdmin(@Param('id') id: number) {
    // TODO(@ahnjaesung): 운영자 계정 판단은 데코레이터에서 토큰을 가지고 판단  date: 2023/07/30 9:52 PM

    return this.schoolPageNewsService.deleteSchoolPageNewsById(id);
  }
}
