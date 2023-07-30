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
  School,
  SchoolMember,
  SchoolMemberSubscription,
  SchoolOperator,
  SchoolPage,
  SchoolPageNews,
} from './entities';

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
      [
        School,
        SchoolPage,
        SchoolPageNews,
        SchoolMember,
        SchoolMemberSubscription,
        SchoolOperator,
      ],
      DOMAINS.School,
    ),
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class SchoolModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
