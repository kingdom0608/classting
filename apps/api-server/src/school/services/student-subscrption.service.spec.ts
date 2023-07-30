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
import {
  Operator,
  SchoolPage,
  SchoolPageNews,
  Student,
  StudentSubscription,
} from '../entities';
import { StudentSubscriptionService } from './student-subscription.service';
import { SchoolPageService } from './school-page.service';
import { StudentService } from './student.service';

describe('StudentSubscriptionService', () => {
  const name = faker.internet.userName();
  let studentService: StudentService;
  let schoolPageService: SchoolPageService;
  let studentSubscriptionService: StudentSubscriptionService;
  let createStudent;
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
        TypeOrmModule.forFeature(
          [SchoolPage, SchoolPageNews, Operator, Student, StudentSubscription],
          DOMAINS.School,
        ),
        CommonModule,
      ],
      providers: [
        StudentService,
        SchoolPageService,
        StudentSubscriptionService,
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    schoolPageService = module.get<SchoolPageService>(SchoolPageService);
    studentSubscriptionService = module.get<StudentSubscriptionService>(
      StudentSubscriptionService,
    );

    createStudent = await studentService.createStudent({
      name: faker.internet.userName(),
    });

    createSchoolPage = await schoolPageService.createSchoolPage({
      name: '한국대학교',
      location: ESchoolPageLocation.SEOUL,
    });
  });

  afterAll(async () => {
    /** 테스트 학교 삭제 */
    await schoolPageService.deleteSchoolPageById(createSchoolPage.id);
  });

  it('createStudentSubscription', async () => {
    const result = await studentSubscriptionService.createStudentSubscription({
      studentId: createStudent.id,
      schoolPageId: createSchoolPage.id,
      isSubscription: true,
    });
    // console.log(result);
    expect(result.studentId).toBe(createStudent.id);
  });
});
