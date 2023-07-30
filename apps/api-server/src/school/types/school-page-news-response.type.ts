import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ESchoolPageNewsStatus } from '@app/common';

export class SchoolPageNewsResponseType {
  @ApiProperty({ description: 'ID' })
  @IsInt()
  id: number;

  @ApiProperty({ description: '학교 페이지 ID' })
  @IsInt()
  schoolPageId: number;

  @ApiProperty({ description: '내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '상태', enum: ESchoolPageNewsStatus })
  @IsString()
  status: ESchoolPageNewsStatus;

  @ApiProperty({ description: '생성 일자' })
  readonly createDate: Date;

  @ApiProperty({ description: '변경 일자' })
  readonly updateDate: Date;
}
