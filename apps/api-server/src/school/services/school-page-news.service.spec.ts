import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonModule,
  DOMAINS,
  ESchoolPageLocation,
  generateTypeormModuleOptions,
} from '@app/common';
import { faker } from '@faker-js/faker';
import { SchoolPageService } from './school-page.service';
import { SchoolPageNewsService } from './school-page-news.service';
import {
  Operator,
  SchoolPage,
  SchoolPageNews,
  Student,
  StudentSubscription,
} from '../entities';

describe('SchoolPageNewsService', () => {
  const name = faker.internet.userName();
  const content = '오늘의 소식';
  let schoolPageService: SchoolPageService;
  let schoolPageNewsService: SchoolPageNewsService;
  let createSchoolPage;
  let createSchoolPageNews;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'env/local.env',
        }),
        TypeOrmModule.forRootAsync({
          name: DOMAINS.School,
          useFactory: (configService: ConfigService) =>
            generateTypeormModuleOptions(configService, DOMAINS.School),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(
          [SchoolPage, SchoolPageNews, Operator, Student, StudentSubscription],
          DOMAINS.School,
        ),
        CommonModule,
      ],
      providers: [SchoolPageService, SchoolPageNewsService],
    }).compile();

    schoolPageService = module.get<SchoolPageService>(SchoolPageService);
    schoolPageNewsService = module.get<SchoolPageNewsService>(
      SchoolPageNewsService,
    );

    createSchoolPage = await schoolPageService.createSchoolPage({
      name: name,
      location: ESchoolPageLocation.SEOUL,
    });
  });

  afterAll(async () => {
    /** 테스트 학교 삭제 */
    await schoolPageService.deleteSchoolPageById(createSchoolPage.id);
  });

  it('createPageNewsSchool', async () => {
    const result = await schoolPageNewsService.createSchoolPageNews({
      schoolPageId: createSchoolPage.id,
      content: content,
    });
    // console.log(result);
    createSchoolPageNews = result;
    expect(result.schoolPageId).toBe(createSchoolPage.id);
  });

  it('getSchoolPageNewsById', async () => {
    const result = await schoolPageNewsService.getSchoolPageNewsById(
      createSchoolPageNews.id,
    );
    // console.log(result);
    expect(result.schoolPageId).toBe(createSchoolPage.id);
    expect(result.content).toBe(content);
  });

  it('updateSchoolPageNewsById', async () => {
    const updateContent = '오늘의 소식 업데이트';
    const result = await schoolPageNewsService.updateSchoolPageNewsById(
      createSchoolPageNews.id,
      {
        content: updateContent,
      },
    );
    // console.log(result);
    expect(result.schoolPageId).toBe(createSchoolPage.id);
    expect(result.content).toBe(updateContent);
  });
});
