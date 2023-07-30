import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonModule,
  DOMAINS,
  generateTypeormModuleOptions,
} from '@app/common';
import { faker } from '@faker-js/faker';
import { StudentService } from './Student.service';
import { Student, StudentSubscription } from '../entities';

describe('StudentService', () => {
  const name = faker.internet.userName();
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
          [Student, StudentSubscription],
          DOMAINS.School,
        ),
        CommonModule,
      ],
      providers: [StudentService],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('createStudent', async () => {
    const result = await studentService.createStudent({
      name: name,
    });
    // console.log(result);
    expect(result.name).toBe(name);
  });
});
