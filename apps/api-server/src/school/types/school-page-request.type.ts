import { ApiProperty } from '@nestjs/swagger';
import {
  ESchoolPageLocation,
  IsPositiveInteger,
  PaginationQuery,
} from '@app/common';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSchoolPageRequestType {
  @ApiProperty({ description: '이름' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: '위치',
    enum: ESchoolPageLocation,
  })
  @IsEnum(ESchoolPageLocation)
  location: ESchoolPageLocation;
}

export class ListSchoolPageRequestType extends PaginationQuery {
  @ApiProperty({ description: '학생 ID' })
  @IsPositiveInteger()
  studentId: number;
}
