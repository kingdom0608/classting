import { ApiProperty } from '@nestjs/swagger';
import { IsPositiveInteger, TrimString } from '@app/common/decorators';
import { IsInt } from 'class-validator';
import { PaginationQuery } from '@app/common';

export class CreateSchoolPageNewsRequestType {
  @ApiProperty({ description: '학교 페이지 ID' })
  @IsInt()
  schoolPageId: number;

  @ApiProperty({ description: '내용' })
  @TrimString()
  content: string;
}

export class UpdateSchoolPageNewsRequestType {
  @ApiProperty({ description: '내용' })
  @TrimString()
  content: string;
}

export class ListSchoolPageNewsRequestType extends PaginationQuery {
  @ApiProperty({ description: '학교 페이지 ID' })
  @IsPositiveInteger()
  schoolPageId: number;
}

export class ListSchoolPageNewsFeedRequestType extends PaginationQuery {
  @ApiProperty({ description: '학생 ID' })
  @IsPositiveInteger()
  studentId: number;
}
