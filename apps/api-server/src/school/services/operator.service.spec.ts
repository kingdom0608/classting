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
import { Operator } from '../entities';

describe('OperatorService', () => {
  const name = faker.internet.userName();
  let operatorService: OperatorService;

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
        TypeOrmModule.forFeature([Operator], DOMAINS.School),
        CommonModule,
      ],
      providers: [OperatorService],
    }).compile();

    operatorService = module.get<OperatorService>(OperatorService);
  });

  it('createOperator', async () => {
    const result = await operatorService.createOperator({
      name: name,
    });
    // console.log(result);
    expect(result.name).toBe(name);
  });
});
