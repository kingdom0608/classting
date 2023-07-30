import { ApiProperty } from '@nestjs/swagger';
import { IsPositiveInteger, PaginationQuery } from '@app/common';

export class SubscriptionSchoolPageRequestType {
  @ApiProperty({
    description: '학생 ID',
  })
  @IsPositiveInteger()
  studentId: number;

  @ApiProperty({
    description: '학교 페이지 ID',
  })
  @IsPositiveInteger()
  schoolPageId: number;
}

export class UnsubscriptionSchoolPageRequestType {
  @ApiProperty({
    description: '학생 ID',
  })
  @IsPositiveInteger()
  studentId: number;

  @ApiProperty({
    description: '학교 페이지 ID',
  })
  @IsPositiveInteger()
  schoolPageId: number;
}

export class ListStudentSubscription extends PaginationQuery {
  @ApiProperty({
    description: '학생 ID',
  })
  @IsPositiveInteger()
  studentId: number;
}
