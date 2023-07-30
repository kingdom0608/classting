import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CommonModule,
  DOMAINS,
  generateTypeormModuleOptions,
  LoggerMiddleware,
  parsedEnvFile,
} from '@app/common';
import {
  Operator,
  SchoolPage,
  SchoolPageNews,
  Student,
  StudentSubscription,
} from './entities';
import {
  OperatorService,
  SchoolPageNewsService,
  SchoolPageService,
  StudentService,
  StudentSubscriptionService,
} from './services';
import {
  AdminSchoolPageController,
  AdminSchoolPageNewsController,
} from './controllers';
import {
  PublicSchoolPageController,
  PublicSchoolPageNewsController,
  PublicStudentSubscriptionController,
} from './controllers/public';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: parsedEnvFile(),
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
  controllers: [
    AdminSchoolPageController,
    AdminSchoolPageNewsController,
    PublicSchoolPageController,
    PublicSchoolPageNewsController,
    PublicStudentSubscriptionController,
  ],
  providers: [
    SchoolPageService,
    SchoolPageNewsService,
    OperatorService,
    StudentService,
    StudentSubscriptionService,
  ],
})
export class SchoolModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
