import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonModule,
  DOMAINS,
  generateTypeormModuleOptions,
} from '@app/common';
import { faker } from '@faker-js/faker';
import { OperatorService } from './operator.service';
import {
  Operator,
  SchoolPage,
  SchoolPageNews,
  Student,
  StudentSubscription,
} from '../entities';
import { StudentService } from './student.service';

describe('MockDataService', () => {
  let operatorService: OperatorService;
  let studentService: StudentService;

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
      providers: [OperatorService, StudentService],
    }).compile();

    operatorService = module.get<OperatorService>(OperatorService);
    studentService = module.get<StudentService>(StudentService);
  });

  it('createOperator', async () => {
    const name = faker.internet.userName();
    const result = await operatorService.createOperator({
      name: name,
    });
    // console.log(result);
    expect(result.name).toBe(name);
  });

  it('createStudent', async () => {
    const name = faker.internet.userName();
    const result = await studentService.createStudent({
      name: name,
    });
    // console.log(result);
    expect(result.name).toBe(name);
  });
});
