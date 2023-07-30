import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ESchoolPageStatus } from '@app/common';
import { IsPositiveInteger } from '@app/common/decorators';

export class StudentSubscriptionResponseType {
  @ApiProperty({ description: 'ID' })
  @IsPositiveInteger()
  id: number;

  @ApiProperty({ description: '학생 ID' })
  @IsPositiveInteger()
  studentId: number;

  @ApiProperty({ description: '학교 페이지 ID' })
  @IsPositiveInteger()
  schoolPageId: number;

  @ApiProperty({ description: '상태', enum: ESchoolPageStatus })
  @IsString()
  status: ESchoolPageStatus;

  @ApiProperty({ description: '구독 여부' })
  @IsBoolean()
  isSubscription: boolean;

  @ApiProperty({ description: '생성 일자' })
  readonly createDate: Date;

  @ApiProperty({ description: '변경 일자' })
  readonly updateDate: Date;
}
