import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ESchoolPageStatus } from '@app/common';

export class SchoolPageResponseType {
  @ApiProperty({ description: 'ID' })
  @IsInt()
  id: number;

  @ApiProperty({ description: '학교 ID' })
  @IsInt()
  schoolId: number;

  @ApiProperty({ description: '상태', enum: ESchoolPageStatus })
  @IsString()
  status: ESchoolPageStatus;

  @ApiProperty({ description: '생성 일자' })
  readonly createDate: Date;

  @ApiProperty({ description: '변경 일자' })
  readonly updateDate: Date;
}
