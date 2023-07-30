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
import { Operator, SchoolPage, SchoolPageNews } from '../entities';

describe('SchoolPageService', () => {
  const name = faker.internet.userName();
  let schoolPageService: SchoolPageService;
  let createSchoolPage;

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
        TypeOrmModule.forFeature([SchoolPage, SchoolPageNews], DOMAINS.School),
        CommonModule,
      ],
      providers: [SchoolPageService],
    }).compile();

    schoolPageService = module.get<SchoolPageService>(SchoolPageService);
  });

  afterAll(async () => {
    /** 테스트 학교 삭제 */
    await schoolPageService.deleteSchoolPageById(createSchoolPage.id);
  });

  it('createPageSchool', async () => {
    const result = await schoolPageService.createSchoolPage({
      name: name,
      location: ESchoolPageLocation.SEOUL,
    });
    // console.log(result);
    createSchoolPage = result;
    expect(result.name).toBe(name);
    expect(result.location).toBe(ESchoolPageLocation.SEOUL);
  });

  it('getSchoolPageById', async () => {
    const result = await schoolPageService.getSchoolPageById(
      createSchoolPage.id,
    );
    // console.log(result);
    expect(result.name).toBe(name);
    expect(result.location).toBe(ESchoolPageLocation.SEOUL);
  });
});
