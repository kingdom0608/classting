import { DOMAINS, ESchoolOperatorStatus } from '@app/common';
import { ManyToOne } from '@app/common/decorators';
import { School } from './school.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: DOMAINS.School })
export class SchoolOperator {
  @ManyToOne(() => School, (school) => school.operators, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  school: School;

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 ID' })
  @RelationId((schoolOperator: SchoolOperator) => schoolOperator.school)
  schoolId: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolOperatorStatus;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
